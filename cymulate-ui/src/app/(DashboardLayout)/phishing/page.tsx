"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Phishing } from "@/app/components";
import { PhishingsProvider } from "@/context";

export default function PhishingPage() {
  return (
    <PhishingsProvider>
      <PageContainer
        title="Phishing Attempts"
        description="Phishing attempts page"
      >
        <DashboardCard title="Phishing Attempts">
          <Phishing />
        </DashboardCard>
      </PageContainer>
    </PhishingsProvider>
  );
}
