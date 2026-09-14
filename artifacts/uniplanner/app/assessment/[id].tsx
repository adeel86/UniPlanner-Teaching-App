import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton, Card, DetailRow, ModuleBadge, StatusPill } from '@/components/PlannerUI';
import { getAssessment, getAssessmentModule } from '@/data/plannerData';
import { useColors } from '@/hooks/useColors';

export default function AssessmentDetailsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const assessment = getAssessment(id ?? '');
  const module = assessment ? getAssessmentModule(assessment) : undefined;
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;

  if (!assessment || !module) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Text style={[styles.missingTitle, { color: colors.foreground }]}>Assessment not found</Text>
        <Pressable onPress={() => router.back()}><Text style={[styles.backLink, { color: colors.primary }]}>Return to assessments</Text></Pressable>
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
        <View style={styles.intro}>
          <ModuleBadge module={module} size="small" />
          <Text style={[styles.title, { color: colors.foreground }]}>{assessment.title}</Text>
          <Text style={[styles.moduleName, { color: colors.mutedForeground }]}>{module.name}</Text>
          <View style={styles.statusRow}>
            <StatusPill status={assessment.status} />
            <Text style={[styles.statusHint, { color: colors.mutedForeground }]}>Assessment details</Text>
          </View>
        </View>
        <Card style={styles.detailsCard}>
          <DetailRow icon="calendar" label="Due date" value={`Thursday ${assessment.dueLabel}`} />
          <DetailRow icon="pie-chart" label="Module weighting" value={`${assessment.weighting}% of final mark`} />
          <DetailRow icon="book-open" label="Module" value={`${module.code} · ${module.name}`} />
        </Card>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>About this assessment</Text>
        <Card style={styles.descriptionCard}>
          <Text style={[styles.description, { color: colors.foreground }]}>{assessment.description}</Text>
          <View style={[styles.tip, { backgroundColor: colors.secondary }]}>
            <Feather name="info" size={16} color={colors.secondaryForeground} />
            <Text style={[styles.tipText, { color: colors.secondaryForeground }]}>
              Keep your notes and evidence together so the final submission is easy to review.
            </Text>
          </View>
        </Card>
        <Pressable
          onPress={() => router.push({ pathname: '/module/[id]', params: { id: module.id } })}
          style={({ pressed }) => [styles.moduleLink, { borderColor: colors.border, opacity: pressed ? 0.65 : 1 }]}
        >
          <Text style={[styles.moduleLinkText, { color: colors.foreground }]}>View {module.code} module</Text>
          <Feather name="arrow-right" size={17} color={colors.primary} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  intro: { marginBottom: 22 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 28, lineHeight: 34, letterSpacing: -0.5, marginTop: 16 },
  moduleName: { fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 7 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15 },
  statusHint: { fontFamily: 'Inter_400Regular', fontSize: 12 },
  detailsCard: { marginBottom: 28 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, marginBottom: 12 },
  descriptionCard: { marginBottom: 16 },
  description: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 22 },
  tip: { flexDirection: 'row', gap: 9, borderRadius: 13, padding: 12, marginTop: 18 },
  tipText: { flex: 1, fontFamily: 'Inter_500Medium', fontSize: 11, lineHeight: 17 },
  moduleLink: { minHeight: 48, borderWidth: 1, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 },
  moduleLinkText: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  missingTitle: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  backLink: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
});