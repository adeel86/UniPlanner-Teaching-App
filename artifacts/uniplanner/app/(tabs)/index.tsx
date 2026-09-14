import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, ModuleBadge, PageHeader, ProgressBar, SectionTitle, StatusPill } from '@/components/PlannerUI';
import { assessments, getAssessmentModule, modules, student } from '@/data/plannerData';
import { useColors } from '@/hooks/useColors';
import { usePlanner } from '@/context/PlannerContext';

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { tasks, toggleTask } = usePlanner();
  const completedTasks = tasks.filter((task) => task.completed).length;
  const nextAssessment = assessments[0];
  const nextAssessmentModule = getAssessmentModule(nextAssessment);
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPadding + 18, paddingBottom: (Platform.OS === 'web' ? 34 : insets.bottom) + 104 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <PageHeader
          eyebrow="Monday, 14 September"
          title={`Good morning,\n${student.name.split(' ')[0]}`}
          subtitle="Here is your study plan for this week."
          action={{ icon: 'bell', label: 'View notifications', onPress: () => undefined }}
        />

        <View style={[styles.weekCard, { backgroundColor: colors.navy }]}>
          <View style={styles.weekCardTop}>
            <View>
              <Text style={[styles.weekLabel, { color: colors.mint }]}>WEEK 2 OF 6</Text>
              <Text style={[styles.weekTitle, { color: colors.primaryForeground }]}>Keep your momentum</Text>
            </View>
            <View style={[styles.weekIcon, { backgroundColor: colors.primary }]}>
              <Feather name="sun" size={20} color={colors.primaryForeground} />
            </View>
          </View>
          <View style={styles.weekProgressRow}>
            <ProgressBar progress={0.34} />
            <Text style={[styles.progressText, { color: colors.mint }]}>34%</Text>
          </View>
          <Text style={[styles.weekCaption, { color: '#B6C6D1' }]}>
            You have {tasks.filter((task) => !task.completed).length} tasks to focus on this week.
          </Text>
        </View>

        <SectionTitle title="Next up" actionLabel="All assessments" onAction={() => router.push('/(tabs)/assessments')} />
        <Card
          onPress={() => router.push({ pathname: '/assessment/[id]', params: { id: nextAssessment.id } })}
          style={styles.assessmentCard}
        >
          <View style={styles.assessmentTop}>
            <View style={styles.assessmentHeading}>
              {nextAssessmentModule ? <ModuleBadge module={nextAssessmentModule} size="small" /> : null}
              <Text style={[styles.assessmentTitle, { color: colors.foreground }]}>{nextAssessment.title}</Text>
              <Text style={[styles.assessmentModule, { color: colors.mutedForeground }]}>
                {nextAssessmentModule?.name}
              </Text>
            </View>
            <View style={[styles.dueDate, { backgroundColor: colors.accent }]}>
              <Text style={[styles.dueDateLabel, { color: colors.accentForeground }]}>DUE</Text>
              <Text style={[styles.dueDateValue, { color: colors.accentForeground }]}>{nextAssessment.dueLabel}</Text>
            </View>
          </View>
          <View style={styles.assessmentBottom}>
            <StatusPill status={nextAssessment.status} />
            <Text style={[styles.weighting, { color: colors.mutedForeground }]}>{nextAssessment.weighting}% of module</Text>
            <Feather name="arrow-up-right" size={18} color={colors.mutedForeground} />
          </View>
        </Card>

        <SectionTitle title="Your modules" actionLabel="See all" onAction={() => router.push('/(tabs)/modules')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {modules.map((module) => (
            <Card
              key={module.id}
              onPress={() => router.push({ pathname: '/module/[id]', params: { id: module.id } })}
              style={styles.moduleCard}
            >
              <ModuleBadge module={module} />
              <Text style={[styles.moduleName, { color: colors.foreground }]} numberOfLines={2}>
                {module.name}
              </Text>
              <Text style={[styles.moduleLecturer, { color: colors.mutedForeground }]} numberOfLines={1}>
                {module.lecturer}
              </Text>
              <View style={styles.moduleFooter}>
                <Text style={[styles.moduleFooterText, { color: colors.primary }]}>View module</Text>
                <Feather name="arrow-up-right" size={14} color={colors.primary} />
              </View>
            </Card>
          ))}
        </ScrollView>

        <SectionTitle title="Focus tasks" actionLabel={`${completedTasks}/${tasks.length} done`} />
        <Card style={styles.tasksCard}>
          {tasks.map((task, index) => (
            <Pressable
              key={task.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: task.completed }}
              onPress={() => toggleTask(task.id)}
              style={({ pressed }) => [styles.taskRow, index < tasks.length - 1 ? styles.taskDivider : null, { opacity: pressed ? 0.65 : 1 }]}
            >
              <View style={[styles.check, { borderColor: task.completed ? colors.success : colors.input, backgroundColor: task.completed ? colors.success : 'transparent' }]}>
                {task.completed ? <Feather name="check" size={13} color={colors.primaryForeground} /> : null}
              </View>
              <View style={styles.taskCopy}>
                <Text style={[styles.taskTitle, { color: task.completed ? colors.mutedForeground : colors.foreground, textDecorationLine: task.completed ? 'line-through' : 'none' }]}>
                  {task.title}
                </Text>
                <Text style={[styles.taskDue, { color: colors.mutedForeground }]}>{task.dueLabel}</Text>
              </View>
              <Feather name="more-horizontal" size={18} color={colors.mutedForeground} />
            </Pressable>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  weekCard: { borderRadius: 24, padding: 20, marginBottom: 28 },
  weekCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  weekLabel: { fontFamily: 'Inter_700Bold', fontSize: 11, letterSpacing: 1.6, marginBottom: 7 },
  weekTitle: { fontFamily: 'Inter_700Bold', fontSize: 21, letterSpacing: -0.3 },
  weekIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  weekProgressRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 26 },
  progressText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  weekCaption: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 10 },
  assessmentCard: { marginBottom: 27 },
  assessmentTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  assessmentHeading: { flex: 1 },
  assessmentTitle: { fontFamily: 'Inter_700Bold', fontSize: 16, lineHeight: 21, marginTop: 12 },
  assessmentModule: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
  dueDate: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 9, alignItems: 'center', alignSelf: 'flex-start' },
  dueDateLabel: { fontFamily: 'Inter_700Bold', fontSize: 9, letterSpacing: 1 },
  dueDateValue: { fontFamily: 'Inter_700Bold', fontSize: 16, marginTop: 2 },
  assessmentBottom: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#E2E6EA' },
  weighting: { fontFamily: 'Inter_400Regular', fontSize: 11, flex: 1 },
  horizontalList: { gap: 12, paddingBottom: 27 },
  moduleCard: { width: 185, minHeight: 160 },
  moduleName: { fontFamily: 'Inter_700Bold', fontSize: 15, lineHeight: 20, marginTop: 18 },
  moduleLecturer: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 6 },
  moduleFooter: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 'auto', paddingTop: 15 },
  moduleFooterText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  tasksCard: { marginBottom: 12 },
  taskRow: { minHeight: 61, flexDirection: 'row', alignItems: 'center', gap: 12 },
  taskDivider: { borderBottomWidth: 1, borderBottomColor: '#E2E6EA' },
  check: { width: 23, height: 23, borderRadius: 8, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  taskCopy: { flex: 1 },
  taskTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  taskDue: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 },
});