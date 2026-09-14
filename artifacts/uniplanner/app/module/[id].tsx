import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton, Card, DetailRow, ModuleBadge, SectionTitle, StatusPill } from '@/components/PlannerUI';
import { assessments, getModule } from '@/data/plannerData';
import { useColors } from '@/hooks/useColors';

export default function ModuleDetailsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const module = getModule(id ?? '');
  const moduleAssessments = assessments.filter((assessment) => assessment.moduleId === module?.id);
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;

  if (!module) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Text style={[styles.missingTitle, { color: colors.foreground }]}>Module not found</Text>
        <Pressable onPress={() => router.back()}><Text style={[styles.backLink, { color: colors.primary }]}>Return to modules</Text></Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPadding + 18, paddingBottom: (Platform.OS === 'web' ? 34 : insets.bottom) + 36 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <BackButton />
        <View style={[styles.hero, { backgroundColor: colors.navy }]}>
          <View style={styles.heroTop}>
            <ModuleBadge module={module} />
            <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
              <Feather name="book-open" size={20} color={colors.primaryForeground} />
            </View>
          </View>
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>{module.name}</Text>
          <Text style={[styles.heroCode, { color: colors.mint }]}>{module.code} · {module.lecturer}</Text>
        </View>
        <Card style={styles.infoCard}>
          <Text style={[styles.description, { color: colors.foreground }]}>{module.description}</Text>
          <View style={styles.detailList}>
            <DetailRow icon="user" label="Lecturer" value={module.lecturer} />
            <DetailRow icon="file-text" label="Assessments" value={`${moduleAssessments.length} assessment${moduleAssessments.length === 1 ? '' : 's'}`} />
            <DetailRow icon="calendar" label="Next deadline" value={moduleAssessments[0]?.dueLabel ?? 'No deadline set'} />
          </View>
        </Card>
        <SectionTitle title="Module assessments" />
        {moduleAssessments.map((assessment) => (
          <Card key={assessment.id} onPress={() => router.push({ pathname: '/assessment/[id]', params: { id: assessment.id } })} style={styles.assessmentCard}>
            <View style={styles.assessmentTop}>
              <View style={styles.assessmentCopy}>
                <Text style={[styles.assessmentTitle, { color: colors.foreground }]}>{assessment.title}</Text>
                <Text style={[styles.assessmentDue, { color: colors.mutedForeground }]}>Due {assessment.dueLabel} · {assessment.weighting}%</Text>
              </View>
              <StatusPill status={assessment.status} />
            </View>
            <View style={styles.openRow}>
              <Text style={[styles.openText, { color: colors.primary }]}>Open assessment</Text>
              <Feather name="arrow-up-right" size={15} color={colors.primary} />
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  hero: { borderRadius: 24, padding: 20, marginBottom: 14 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  heroTitle: { fontFamily: 'Inter_700Bold', fontSize: 24, lineHeight: 30, marginTop: 26 },
  heroCode: { fontFamily: 'Inter_500Medium', fontSize: 12, marginTop: 8 },
  infoCard: { marginBottom: 26 },
  description: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, marginBottom: 20 },
  detailList: { borderTopWidth: 1, borderTopColor: '#E2E6EA', paddingTop: 18 },
  assessmentCard: { marginBottom: 11 },
  assessmentTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  assessmentCopy: { flex: 1 },
  assessmentTitle: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  assessmentDue: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 6 },
  openRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E2E6EA' },
  openText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  missingTitle: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  backLink: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
});