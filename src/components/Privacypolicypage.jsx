import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Title, Text, Stack } from "@mantine/core";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Algo Dreamin Traders</title>
        <meta
          name="description"
          content="Comprehensive privacy policy detailing how Algo Dreamin Traders collects, uses, protects, and manages user data."
        />
      </Helmet>

      <Container size="md" py="xl">
        <Stack spacing="lg">
          <Title fw={'500'} order={1}>Privacy Policy</Title>

          <Text>
            At Algo Dreamin Traders ("Platform", "we", "our"), we are committed to maintaining the highest standards of privacy and data protection. This Privacy Policy explains in detail how your personal and technical information is collected, used, processed, and safeguarded when you interact with our platform. By using our services, you acknowledge and agree to the practices described in this policy. We aim to provide complete transparency so that you understand how your data is handled at every stage. Your trust is important to us, and we continuously work to improve our data protection practices. This policy applies to all users accessing our platform through any device or interface.
          </Text>

          <Title fw={'500'} order={3}>Information We Collect</Title>
          <Text>
            We collect information that you voluntarily provide when registering or using our services. This includes personal details such as your name, email address, mobile number, and login credentials. Additionally, when you connect your broker account, we may store API-related credentials in a secure, encrypted format. We only collect information that is necessary for providing our services effectively. Any sensitive information is handled with strict confidentiality and security controls. We do not collect unnecessary personal data beyond what is required for platform functionality. Our goal is to minimize data collection while ensuring optimal user experience.
          </Text>

          <Title fw={'500'} order={3}>Automatically Collected Data</Title>
          <Text>
            When you access the platform, certain information is automatically collected through system logs and analytics tools. This may include your IP address, browser type, operating system, device information, and browsing behavior within the platform. We also track session activity such as pages visited, time spent, and interactions performed. This data helps us understand user behavior and improve the usability of our platform. It also assists in identifying technical issues and optimizing performance. All such data is collected in compliance with applicable laws and is primarily used for analytical and security purposes.
          </Text>

          <Title fw={'500'} order={3}>How We Use Your Information</Title>
          <Text>
            The information we collect is used to operate, maintain, and enhance our platform services. This includes managing your account, enabling trading functionalities, processing transactions, and sending important system notifications. We also use your data to improve user experience by analyzing usage patterns and optimizing features. Communication related to updates, security alerts, or service changes may also be sent using your contact information. In some cases, aggregated data may be used for internal research and development. We ensure that your information is used only for legitimate business purposes and not for any unauthorized activities.
          </Text>

          <Title fw={'500'} order={3}>Data Protection & Security</Title>
          <Text>
            We implement robust security measures to protect your data from unauthorized access, misuse, or disclosure. This includes encryption of sensitive data, secure API communication, HTTPS protocols, and token-based authentication systems. Access to user data is strictly limited to authorized personnel who require it for operational purposes. Regular monitoring and security audits are conducted to identify and mitigate potential vulnerabilities. While we strive to maintain the highest level of security, users are also encouraged to follow best practices such as using strong passwords. No system can be completely immune to risks, but we continuously enhance our defenses.
          </Text>

          <Title fw={'500'} order={3}>Broker & Third-Party Integrations</Title>
          <Text>
            Our platform integrates with third-party brokerage services to enable trading functionalities. While we ensure secure transmission of data between systems, we do not control how third-party services manage your information. Each broker operates under its own privacy policies and terms of service. We recommend reviewing their policies before connecting your account. We only store necessary integration details required for functionality and keep them encrypted. Any data shared externally is limited to what is essential for execution. We are not responsible for third-party data handling practices beyond our control.
          </Text>

          <Title fw={'500'} order={3}>Cookies & Tracking Technologies</Title>
          <Text>
            Cookies and similar technologies are used to enhance your experience on our platform. These help us maintain active sessions, remember user preferences, and analyze how users interact with our services. Cookies may store temporary identifiers that improve performance and usability. Some cookies are session-based, while others may persist for longer durations. You have the option to disable cookies through your browser settings, although certain features may be affected. We do not use cookies for intrusive tracking or unauthorized data collection. Their primary purpose is to improve functionality and user experience.
          </Text>

          <Title fw={'500'} order={3}>Data Sharing & Disclosure</Title>
          <Text>
            We do not sell, rent, or trade your personal data to third parties under any circumstances. Information may only be disclosed when required by law, legal processes, or regulatory authorities. We may also share data to enforce our terms, detect fraud, or ensure system security. In certain cases, trusted service providers may be involved in operations, but they are bound by strict confidentiality agreements. Any sharing of information is done with careful consideration and minimal exposure. Protecting your privacy remains our top priority at all times.
          </Text>

          <Title fw={'500'} order={3}>Data Retention</Title>
          <Text>
            We retain user data only for as long as it is necessary to fulfill operational, legal, and security requirements. Active accounts will have their data maintained to ensure continuous service. Even after account closure, certain data may be retained to comply with legal obligations or resolve disputes. Retention policies are periodically reviewed to ensure compliance with applicable regulations. We aim to avoid unnecessary storage of outdated or irrelevant information. Users can request clarification regarding data retention practices at any time. Our approach balances operational needs with privacy protection.
          </Text>

          <Title fw={'500'} order={3}>Account Deletion</Title>
          <Text>
            Users have the right to request deletion of their account and associated data. To initiate this process, you can contact us via our support email. Upon receiving the request, we will verify account ownership and check for any pending obligations. Once cleared, the deletion process will begin and is typically completed within a reasonable timeframe. Certain data may still be retained if required for legal compliance. We ensure that deletion requests are handled securely and efficiently. Transparency is maintained throughout the process.
          </Text>

          <Title fw={'500'} order={3}>User Responsibilities</Title>
          <Text>
            Users are responsible for maintaining the confidentiality of their login credentials and account information. It is important to use strong passwords and avoid sharing sensitive details with others. Accessing the platform from secure devices and networks is strongly recommended. Users should regularly monitor their account activity for any suspicious behavior. Any unauthorized access should be reported immediately. While we provide security measures, user awareness plays a crucial role in overall protection. Responsible usage ensures a safer environment for everyone.
          </Text>

          <Title fw={'500'} order={3}>Policy Updates</Title>
          <Text>
            This Privacy Policy may be updated periodically to reflect changes in services, technology, or legal requirements. We encourage users to review this page regularly to stay informed. Significant updates may be communicated through notifications or email. Continued use of the platform after changes implies acceptance of the revised policy. We aim to keep our policies clear, transparent, and up to date. Any modifications will be made with user interests in mind. Your continued trust is important to us.
          </Text>

          <Title fw={'500'} order={3}>Contact Us</Title>
          <Text>
            If you have any questions, concerns, or requests regarding this Privacy Policy, you can reach out to us via dreaminalgo@gmail.com . Our team will review your query and respond within a reasonable timeframe. We are committed to addressing all privacy-related concerns seriously. Open communication helps us improve and maintain trust with our users. Feel free to contact us for clarifications or additional information at any time. Your privacy matters to us.
          </Text>
        </Stack>
      </Container>
    </>
  );
}