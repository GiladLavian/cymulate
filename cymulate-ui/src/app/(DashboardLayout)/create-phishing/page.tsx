"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { CreatePhishing } from "@/app/components";
import { PhishingsProvider } from "@/context";

export default function PhishingPage() {
  return (
    <PhishingsProvider>
      <PageContainer
        title="Create Phishing Attempt"
        description="Create phishing attempt page"
      >
        <DashboardCard title="Create Phishing Attempt">
          <CreatePhishing />
        </DashboardCard>
      </PageContainer>
    </PhishingsProvider>
  );
}
