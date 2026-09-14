import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, PageHeader } from '@/components/PlannerUI';
import { student } from '@/data/plannerData';
import { useColors } from '@/hooks/useColors';
import { usePlanner } from '@/context/PlannerContext';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { resetTasks } = usePlanner();
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPadding + 18, paddingBottom: (Platform.OS === 'web' ? 34 : insets.bottom) + 104 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <PageHeader eyebrow="Your account" title="Profile" subtitle="Your student details and preferences" />
        <Card style={[styles.profileCard, { backgroundColor: colors.navy, borderColor: colors.navy }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.primaryForeground }]}>MT</Text>
          </View>
          <Text style={[styles.name, { color: colors.primaryForeground }]}>{student.name}</Text>
          <Text style={[styles.email, { color: colors.mint }]}>{student.email}</Text>
          <View style={styles.programmeRow}>
            <View style={[styles.programmeTag, { backgroundColor: '#24364C' }]}>
              <Text style={[styles.programmeText, { color: colors.mint }]}>{student.year}</Text>
            </View>
            <Text style={[styles.programmeName, { color: '#B6C6D1' }]}>{student.programme}</Text>
          </View>
        </Card>
        <Text style={[styles.groupLabel, { color: colors.mutedForeground }]}>Preferences</Text>
        <Card style={styles.settingsCard}>
          <SettingRow icon="bell" label="Notifications" value="On" />
          <SettingRow icon="calendar" label="Academic year" value="2026 / 27" />
          <SettingRow icon="help-circle" label="Help and feedback" />
        </Card>
        <Text style={[styles.groupLabel, { color: colors.mutedForeground }]}>Teaching project</Text>
        <Card style={styles.teachingCard}>
          <View style={[styles.teachingIcon, { backgroundColor: colors.secondary }]}>
            <Feather name="layers" size={19} color={colors.secondaryForeground} />
          </View>
          <View style={styles.teachingCopy}>
            <Text style={[styles.teachingTitle, { color: colors.foreground }]}>Week 1 · Mobile fundamentals</Text>
            <Text style={[styles.teachingMessage, { color: colors.mutedForeground }]}>
              This version uses local sample data and simple screen state. Later weeks introduce architecture, APIs, testing, and refactoring.
            </Text>
          </View>
        </Card>
        <Pressable
          onPress={resetTasks}
          accessibilityRole="button"
          style={({ pressed }) => [styles.resetButton, { borderColor: colors.border, opacity: pressed ? 0.65 : 1 }]}
        >
          <Feather name="rotate-ccw" size={15} color={colors.mutedForeground} />
          <Text style={[styles.resetText, { color: colors.mutedForeground }]}>Reset sample task progress</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function SettingRow({ icon, label, value }: { icon: React.ComponentProps<typeof Feather>['name']; label: string; value?: string }) {
  const colors = useColors();
  return (
    <Pressable onPress={() => undefined} style={({ pressed }) => [styles.settingRow, { opacity: pressed ? 0.65 : 1 }]}>
      <View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}>
        <Feather name={icon} size={16} color={colors.secondaryForeground} />
      </View>
      <Text style={[styles.settingLabel, { color: colors.foreground }]}>{label}</Text>
      {value ? <Text style={[styles.settingValue, { color: colors.mutedForeground }]}>{value}</Text> : null}
      <Feather name="chevron-right" size={17} color={colors.mutedForeground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  profileCard: { alignItems: 'center', paddingVertical: 24, marginBottom: 24 },
  avatar: { width: 68, height: 68, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarText: { fontFamily: 'Inter_700Bold', fontSize: 21 },
  name: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  email: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 5 },
  programmeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 18 },
  programmeTag: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 },
  programmeText: { fontFamily: 'Inter_700Bold', fontSize: 10 },
  programmeName: { fontFamily: 'Inter_400Regular', fontSize: 11 },
  groupLabel: { fontFamily: 'Inter_700Bold', fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', marginBottom: 10 },
  settingsCard: { paddingHorizontal: 16, marginBottom: 24 },
  settingRow: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 11, borderBottomWidth: 1, borderBottomColor: '#E2E6EA' },
  settingRowLast: { borderBottomWidth: 0 },
  settingIcon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  settingLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 13, flex: 1 },
  settingValue: { fontFamily: 'Inter_400Regular', fontSize: 12 },
  teachingCard: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  teachingIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  teachingCopy: { flex: 1 },
  teachingTitle: { fontFamily: 'Inter_700Bold', fontSize: 14, marginBottom: 6 },
  teachingMessage: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  resetButton: { borderWidth: 1, borderRadius: 13, minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  resetText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
});