import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useColors } from '@/hooks/useColors';
import { AssessmentStatus, Module } from '@/data/plannerData';

type IconName = React.ComponentProps<typeof Feather>['name'];

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: { icon: IconName; onPress: () => void; label: string };
}) {
  const colors = useColors();
  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        {eyebrow ? <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text> : null}
        <Text style={[styles.pageTitle, { color: colors.foreground }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{subtitle}</Text> : null}
      </View>
      {action ? (
        <Pressable
          accessibilityLabel={action.label}
          onPress={action.onPress}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Feather name={action.icon} size={19} color={colors.foreground} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function SectionTitle({ title, actionLabel, onAction }: { title: string; actionLabel?: string; onAction?: () => void }) {
  const colors = useColors();
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button">
          <Text style={[styles.actionText, { color: colors.primary }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function ModuleBadge({ module, size = 'regular' }: { module: Module; size?: 'small' | 'regular' }) {
  const colors = useColors();
  const background = {
    coral: colors.primary,
    mint: colors.mint,
    sky: colors.sky,
    gold: colors.gold,
  }[module.color];
  const foreground = module.color === 'coral' ? colors.primaryForeground : colors.foreground;
  return (
    <View style={[styles.moduleBadge, size === 'small' ? styles.moduleBadgeSmall : null, { backgroundColor: background }]}>
      <Text style={[styles.moduleBadgeText, size === 'small' ? styles.moduleBadgeTextSmall : null, { color: foreground }]}>
        {module.code}
      </Text>
    </View>
  );
}

export function StatusPill({ status }: { status: AssessmentStatus }) {
  const colors = useColors();
  const palette = {
    'In progress': { backgroundColor: colors.accent, color: colors.accentForeground },
    'Not started': { backgroundColor: colors.muted, color: colors.mutedForeground },
    Submitted: { backgroundColor: colors.secondary, color: colors.secondaryForeground },
  }[status];
  return (
    <View style={[styles.statusPill, { backgroundColor: palette.backgroundColor }]}>
      <Text style={[styles.statusText, { color: palette.color }]}>{status}</Text>
    </View>
  );
}

export function EmptyState({ icon, title, message }: { icon: IconName; title: string; message: string }) {
  const colors = useColors();
  return (
    <View style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}>
        <Feather name={icon} size={22} color={colors.secondaryForeground} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.emptyMessage, { color: colors.mutedForeground }]}>{message}</Text>
    </View>
  );
}

export function Card({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const colors = useColors();
  const content = <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>{children}</View>;
  if (!onPress) return content;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.pressableCard, { opacity: pressed ? 0.82 : 1 }]}
    >
      {content}
    </Pressable>
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  const colors = useColors();
  return (
    <View style={[styles.progressTrack, { backgroundColor: colors.muted }]}>
      <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%`, backgroundColor: colors.primary }]} />
    </View>
  );
}

export function BackButton() {
  const colors = useColors();
  return (
    <Pressable
      accessibilityLabel="Go back"
      onPress={() => router.back()}
      style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.6 : 1 }]}
    >
      <Feather name="arrow-left" size={22} color={colors.foreground} />
      <Text style={[styles.backText, { color: colors.foreground }]}>Back</Text>
    </Pressable>
  );
}

export function DetailRow({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  const colors = useColors();
  return (
    <View style={styles.detailRow}>
      <View style={[styles.detailIcon, { backgroundColor: colors.secondary }]}>
        <Feather name={icon} size={16} color={colors.secondaryForeground} />
      </View>
      <View style={styles.detailCopy}>
        <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>{label}</Text>
        <Text style={[styles.detailValue, { color: colors.foreground }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 26 },
  headerCopy: { flex: 1, paddingRight: 20 },
  eyebrow: { fontFamily: 'Inter_700Bold', fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8 },
  pageTitle: { fontFamily: 'Inter_700Bold', fontSize: 30, lineHeight: 36, letterSpacing: -0.6 },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20, marginTop: 8 },
  iconButton: { width: 42, height: 42, borderWidth: 1, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, marginTop: 2 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, letterSpacing: -0.2 },
  actionText: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  card: { borderRadius: 20, borderWidth: 1, padding: 16 },
  pressableCard: { borderRadius: 20 },
  moduleBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7, alignSelf: 'flex-start' },
  moduleBadgeSmall: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 },
  moduleBadgeText: { fontFamily: 'Inter_700Bold', fontSize: 12, letterSpacing: 0.4 },
  moduleBadgeTextSmall: { fontSize: 10 },
  statusPill: { borderRadius: 100, paddingHorizontal: 9, paddingVertical: 5, alignSelf: 'flex-start' },
  statusText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  emptyState: { borderRadius: 20, borderWidth: 1, padding: 24, alignItems: 'center' },
  emptyIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  emptyTitle: { fontFamily: 'Inter_700Bold', fontSize: 16, marginBottom: 5 },
  emptyMessage: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, textAlign: 'center', maxWidth: 270 },
  progressTrack: { height: 8, borderRadius: 100, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 100 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 22 },
  backText: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 17 },
  detailIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  detailCopy: { flex: 1 },
  detailLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, marginBottom: 2 },
  detailValue: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
});