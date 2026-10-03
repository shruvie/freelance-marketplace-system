'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-emerald prose-lg text-gray-600">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p className="mb-6">
            Welcome to FreelanceMarketPlace. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. The Data We Collect About You</h2>
          <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
            <li><strong>Google Authentication Data</strong> includes the email and basic profile information provided when you sign in using Google.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Data</h2>
          <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>To manage your account and authentication via third-party providers like Google.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Third-Party Links</h2>
          <p className="mb-6">
            This website may include links to third-party websites, plug-ins and applications. Clicking on those links or 
            enabling those connections may allow third parties to collect or share data about you. We do not control these 
            third-party websites and are not responsible for their privacy statements.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this privacy policy or our privacy practices, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
