import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Title, Text, Stack } from "@mantine/core";

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Algo Dreamin Traders</title>
        <meta
          name="description"
          content="Read the detailed terms and conditions for using Algo Dreamin Traders platform including user responsibilities, trading risks, and legal policies."
        />
      </Helmet>

      <Container size="md" py="xl">
        <Stack spacing="lg">
          <Title fw={"500"} order={1}>Terms & Conditions</Title>

          <Text>
            Welcome to Algo Dreamin Traders ("Platform", "we", "our"). By accessing, registering, or using any part of our platform, you agree to comply with and be legally bound by these Terms & Conditions. These terms govern your use of all services, features, and functionalities provided by us. It is your responsibility to read and understand these terms before using the platform. Continued use of the platform indicates your acceptance of any updates or modifications made to these terms. If you do not agree with any part of these conditions, you must immediately discontinue using the platform. These terms are designed to ensure fair usage, legal compliance, and protection for both users and the platform.
          </Text>

          <Title fw={"500"} order={3}>User Registration & Access</Title>
          <Text>
            To access certain features of the platform, you may be required to create an account and provide accurate personal information. You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account. Any false, misleading, or incomplete information may result in suspension or termination of your access. We reserve the right to verify user details at any time for security and compliance purposes. Unauthorized access, account sharing, or misuse of credentials is strictly prohibited. You must notify us immediately if you suspect any unauthorized activity. Ensuring the security of your account is a shared responsibility between you and the platform.
          </Text>

          <Title fw={"500"} order={3}>Platform License</Title>
          <Text>
            We grant you a limited, non-exclusive, non-transferable, and revocable license to use the platform for personal and lawful purposes. This license does not grant you ownership of any part of the platform, including software, design, or content. You may not copy, reproduce, modify, distribute, or create derivative works without prior written consent. Unauthorized use of the platform may result in immediate termination of access. All rights not expressly granted remain reserved by the platform. This license is provided solely to enable you to use the platform as intended. Any violation of these terms will result in strict action.
          </Text>

          <Title fw={"500"} order={3}>Use Restrictions</Title>
          <Text>
            You agree not to misuse the platform in any manner that could harm, disrupt, or compromise its functionality or security. This includes attempting unauthorized access, reverse engineering, data scraping, or using automated bots. Engaging in illegal activities or violating any applicable laws while using the platform is strictly prohibited. You must not exploit any vulnerabilities or attempt to bypass security measures. Any abusive behavior, including harassment or misuse of services, may lead to account suspension. We actively monitor activities to ensure compliance with these restrictions. Violations may result in permanent bans and legal consequences.
          </Text>

          <Title fw={"500"} order={3}>Broker Integration & Risk</Title>
          <Text>
            Our platform integrates with third-party brokerage services to facilitate trading activities. We do not act as a broker, financial advisor, or SEBI-registered entity. All trades executed through broker APIs are solely initiated and authorized by the user. Market conditions, execution delays, API failures, and slippage are inherent risks in trading. We are not responsible for any financial losses incurred due to such factors. Users must fully understand the risks associated with algorithmic trading before using the platform. It is strongly recommended to test strategies in paper trading before deploying real capital. Trading involves risk, and users must act responsibly.
          </Text>

          <Title fw={"500"} order={3}>Strategy & Intellectual Property</Title>
          <Text>
            Any strategies created, deployed, or shared on the platform remain the intellectual property of their respective creators. You are granted limited rights to use strategies for personal purposes only. Copying, redistributing, or selling strategies without proper authorization is strictly prohibited. The platform does not claim ownership of user-generated strategies but reserves the right to remove content that violates policies. Respecting intellectual property rights is essential for maintaining a fair ecosystem. Any infringement may result in legal action. Users are encouraged to protect their own work responsibly.
          </Text>

          <Title fw={"500"} order={3}>Payments & Refunds</Title>
          <Text>
            All payments made for subscriptions, tokens, or services on the platform are final and non-refundable unless explicitly stated otherwise. Pricing may change at any time without prior notice, but existing subscriptions will be honored until expiry. Users are responsible for reviewing pricing and features before making a purchase. Failed transactions or technical issues should be reported immediately. We do not guarantee refunds for unused services or partial usage. Any disputes regarding payments will be handled on a case-by-case basis. Transparency in billing is maintained at all times.
          </Text>

          <Title fw={"500"} order={3}>Service Availability</Title>
          <Text>
            While we strive to provide uninterrupted access to the platform, we do not guarantee continuous availability. Downtime may occur due to maintenance, server issues, broker API failures, or unforeseen technical problems. We are not liable for any losses resulting from such interruptions. Users are advised to monitor their strategies and positions regularly. Scheduled maintenance may be conducted without prior notice. We continuously work to improve system reliability and performance. However, no system can be completely free from disruptions.
          </Text>

          <Title fw={"500"} order={3}>Limitation of Liability</Title>
          <Text>
            The platform is provided on an "as-is" and "as-available" basis without any warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform. This includes financial losses, missed opportunities, or system errors. Users accept full responsibility for their trading decisions and outcomes. We do not guarantee profits or performance of any strategy. Liability is limited to the maximum extent permitted by applicable law. Using the platform implies acceptance of these limitations.
          </Text>

          <Title fw={"500"} order={3}>Indemnification</Title>
          <Text>
            You agree to indemnify and hold harmless the platform, its owners, employees, and affiliates from any claims, damages, or losses arising from your use of the platform. This includes violations of these terms, misuse of services, or infringement of any rights. You are responsible for ensuring that your activities comply with all applicable laws and regulations. Any legal consequences resulting from your actions will be your sole responsibility. We reserve the right to take appropriate action in response to violations. This clause ensures protection for the platform against misuse.
          </Text>

          <Title fw={"500"} order={3}>Data & Security</Title>
          <Text>
            We implement industry-standard security measures to protect user data and system integrity. However, users are responsible for maintaining the confidentiality of their credentials. Sharing login details or failing to secure your account may result in unauthorized access. We are not responsible for breaches caused by user negligence. Regular monitoring and responsible usage are strongly recommended. Security practices are continuously updated to address emerging threats. Protecting your data is a shared responsibility.
          </Text>

          <Title fw={"500"} order={3}>Disclaimer</Title>
          <Text>
            The platform does not provide investment, financial, or trading advice. All content, tools, and strategies are for informational and educational purposes only. Past performance does not guarantee future results. Users should conduct their own research before making any trading decisions. We strongly recommend consulting a qualified financial advisor if needed. The platform is not responsible for any decisions made based on the provided tools. All risks are borne entirely by the user.
          </Text>

          <Title fw={"500"} order={3}>Governing Law</Title>
          <Text>
            These Terms & Conditions are governed by and interpreted in accordance with the laws of India. Any disputes arising from the use of the platform will be subject to the jurisdiction of the appropriate courts. Users agree to comply with all applicable local, national, and international laws. Legal proceedings, if any, will be handled within the specified jurisdiction. This ensures clarity and legal consistency for all parties involved. Compliance with governing laws is mandatory.
          </Text>

          <Title fw={"500"} order={3}>Contact</Title>
          <Text>
            If you have any questions, concerns, or feedback regarding these Terms & Conditions, you can contact us at support@dreamintraders.in. Our team will review your query and respond within a reasonable timeframe. We are committed to providing clarity and resolving any issues promptly. Open communication helps us improve our services. Users are encouraged to reach out whenever necessary. Your trust and understanding are important to us.
          </Text>
        </Stack>
      </Container>
    </>
  );
}
