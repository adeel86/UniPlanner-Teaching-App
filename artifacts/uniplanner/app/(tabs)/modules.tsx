import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, ModuleBadge, PageHeader } from '@/components/PlannerUI';
import { modules, assessments } from '@/data/plannerData';
import { useColors } from '@/hooks/useColors';

export default function ModulesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPadding + 18, paddingBottom: (Platform.OS === 'web' ? 34 : insets.bottom) + 104 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <PageHeader eyebrow="Your semester" title="Modules" subtitle={`${modules.length} modules this term`} />
        <View style={[styles.searchHint, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={17} color={colors.mutedForeground} />
          <Text style={[styles.searchText, { color: colors.mutedForeground }]}>Search modules</Text>
          <View style={[styles.searchKey, { backgroundColor: colors.muted }]}>
            <Text style={[styles.searchKeyText, { color: colors.mutedForeground }]}>⌘ K</Text>
          </View>
        </View>
        <View style={styles.list}>
          {modules.map((module) => {
            const moduleAssessments = assessments.filter((assessment) => assessment.moduleId === module.id);
            return (
              <Card key={module.id} onPress={() => router.push({ pathname: '/module/[id]', params: { id: module.id } })} style={styles.moduleCard}>
                <View style={styles.cardTop}>
                  <ModuleBadge module={module} />
                  <Pressable accessibilityLabel={`More options for ${module.name}`} onPress={() => undefined} hitSlop={10}>
                    <Feather name="more-horizontal" size={21} color={colors.mutedForeground} />
                  </Pressable>
                </View>
                <Text style={[styles.moduleName, { color: colors.foreground }]}>{module.name}</Text>
                <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={2}>{module.description}</Text>
                <View style={styles.cardBottom}>
                  <View style={styles.lecturer}>
                    <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
                      <Text style={[styles.avatarText, { color: colors.secondaryForeground }]}>{module.lecturer.split(' ').slice(-1)[0][0]}</Text>
                    </View>
                    <Text style={[styles.lecturerName, { color: colors.mutedForeground }]}>{module.lecturer}</Text>
                  </View>
                  <View style={styles.assessmentCount}>
                    <Feather name="file-text" size={14} color={colors.primary} />
                    <Text style={[styles.assessmentCountText, { color: colors.primary }]}>{moduleAssessments.length} assessment</Text>
                  </View>
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
  searchHint: { borderWidth: 1, borderRadius: 15, minHeight: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10, marginBottom: 22 },
  searchText: { fontFamily: 'Inter_400Regular', fontSize: 13, flex: 1 },
  searchKey: { borderRadius: 7, paddingHorizontal: 7, paddingVertical: 4 },
  searchKeyText: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  list: { gap: 12 },
  moduleCard: { padding: 18 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  moduleName: { fontFamily: 'Inter_700Bold', fontSize: 18, lineHeight: 23, marginTop: 17 },
  description: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20, marginTop: 7 },
  cardBottom: { borderTopWidth: 1, borderTopColor: '#E2E6EA', marginTop: 17, paddingTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lecturer: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  avatar: { width: 25, height: 25, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Inter_700Bold', fontSize: 11 },
  lecturerName: { fontFamily: 'Inter_400Regular', fontSize: 11 },
  assessmentCount: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  assessmentCountText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
});