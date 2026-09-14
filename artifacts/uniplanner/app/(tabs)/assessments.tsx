import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, ModuleBadge, PageHeader, StatusPill } from '@/components/PlannerUI';
import { AssessmentStatus, assessments, getAssessmentModule } from '@/data/plannerData';
import { useColors } from '@/hooks/useColors';

const filters: Array<'All' | AssessmentStatus> = ['All', 'In progress', 'Not started'];

export default function AssessmentsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const visibleAssessments = useMemo(
    () => assessments.filter((assessment) => filter === 'All' || assessment.status === filter),
    [filter],
  );

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPadding + 18, paddingBottom: (Platform.OS === 'web' ? 34 : insets.bottom) + 104 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <PageHeader
          eyebrow="Deadlines at a glance"
          title="Assessments"
          subtitle={`${assessments.length} pieces of work across your modules`}
          action={{ icon: 'plus', label: 'Add assessment', onPress: () => undefined }}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((item) => {
            const isActive = filter === item;
            return (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                accessibilityRole="button"
                style={[styles.filter, { backgroundColor: isActive ? colors.navy : colors.card, borderColor: isActive ? colors.navy : colors.border }]}
              >
                <Text style={[styles.filterText, { color: isActive ? colors.primaryForeground : colors.mutedForeground }]}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View style={styles.list}>
          {visibleAssessments.map((assessment) => {
            const module = getAssessmentModule(assessment);
            return (
              <Card key={assessment.id} onPress={() => router.push({ pathname: '/assessment/[id]', params: { id: assessment.id } })} style={styles.assessmentCard}>
                <View style={styles.cardTop}>
                  {module ? <ModuleBadge module={module} size="small" /> : null}
                  <StatusPill status={assessment.status} />
                </View>
                <Text style={[styles.title, { color: colors.foreground }]}>{assessment.title}</Text>
                <Text style={[styles.moduleName, { color: colors.mutedForeground }]}>{module?.name}</Text>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Feather name="calendar" size={14} color={colors.primary} />
                    <Text style={[styles.metaText, { color: colors.foreground }]}>{assessment.dueLabel}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Feather name="pie-chart" size={14} color={colors.primary} />
                    <Text style={[styles.metaText, { color: colors.foreground }]}>{assessment.weighting}% weighting</Text>
                  </View>
                  <Feather name="arrow-up-right" size={17} color={colors.mutedForeground} />
                </View>
              </Card>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  filterRow: { gap: 8, paddingBottom: 20 },
  filter: { borderWidth: 1, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 9 },
  filterText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  list: { gap: 12 },
  assessmentCard: { padding: 18 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontFamily: 'Inter_700Bold', fontSize: 17, marginTop: 16 },
  moduleName: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 5 },
  metaRow: { borderTopWidth: 1, borderTopColor: '#E2E6EA', marginTop: 17, paddingTop: 13, flexDirection: 'row', alignItems: 'center', gap: 13 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
});