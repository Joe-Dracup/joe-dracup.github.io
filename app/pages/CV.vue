<script setup lang="ts">
// definePageMeta({
//   layout: false,
// });
</script>

<template>
  <div
    class="max-w-4xl mx-auto p-6 print:p-8 print:w-full print:max-w-none print:mx-0"
  >
    <header
      class="border-b border-gray-300 pb-4 mb-6 print:page-break-after-avoid"
    >
      <h1 class="text-4xl font-bold">
        Joseph
        <span class="text-green-600 print:text-green-600">Dracup</span>
      </h1>
      <h2 class="text-2xl font-semibold mt-1">Software Developer</h2>
    </header>

    <!-- Two-column layout with print-specific classes -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid print:[grid-template-columns:1fr_2fr]"
    >
      <!-- Left column -->
      <div
        class="print:break-inside-avoid border-r border-gray-300 pr-6 print:pr-3"
      >
        <!-- Contact -->
        <section class="mb-8 print:break-inside-avoid">
          <h3
            class="text-xl text-green-600 print:text-green-600 font-semibold mb-3"
          >
            Contact
          </h3>
          <ul class="space-y-1">
            <li>
              <a
                href="https://www.linkedin.com/in/joe-dracup"
                class="hover:text-green-600"
                >www.linkedin.com/in/joe-dracup</a
              >
            </li>
            <li>07552413479</li>
            <li>
              <a
                href="mailto:josephdracup1@gmail.com"
                class="hover:text-green-600"
                >josephdracup1@gmail.com</a
              >
            </li>
            <li>
              <a
                href="https://github.com/Joe-Dracup"
                class="hover:text-green-600"
                >github.com/Joe-Dracup</a
              >
            </li>
            <li>
              <a href="https://dracup.io" class="hover:text-green-600"
                >dracup.io</a
              >
            </li>
          </ul>
        </section>

        <!-- Key Skills -->
        <section class="mb-8 print:break-inside-avoid">
          <h3
            class="text-xl text-green-600 print:text-green-600 font-semibold mb-3"
          >
            Key Skills
          </h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>.Net</li>
            <li>C#</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Vue</li>
            <li>Nuxt</li>
            <li>React</li>
            <li>SQL</li>
            <li>Git</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Tailwind</li>
            <li>Communication</li>
            <li>Leadership</li>
            <li>Problem solving</li>
            <li>Agile</li>
            <li>Scrum</li>
          </ul>
        </section>

        <!-- Education -->
        <section class="mb-8 print:break-inside-avoid">
          <h3
            class="text-xl text-green-600 print:text-green-600 font-semibold mb-3"
          >
            Education
          </h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Software development level 3 Apprenticeship</li>
            <li>4 A / AS levels, including a Distinction* in ICT</li>
            <li>9 GCSEs, English and Maths</li>
          </ul>
        </section>

        <!-- Interests -->
        <section class="print:break-inside-avoid">
          <h3
            class="text-xl text-green-600 print:text-green-600 font-semibold mb-3"
          >
            Interests
          </h3>
          <div class="space-y-3 text-sm">
            <p>
              I try to stay up to date as much as possible on modern development
              practices, as part of this I have attended both NDC london and vue
              JS Amsterdam with the aim of doing more conferences and meetups in
              the future.
            </p>
            <p>
              I have climbed several mountains in the UK with the most recent
              being Scafell Pike, and the Yorkshire three peaks challenge.
            </p>
            <p>
              In my free time I enjoy watching films, from classics to
              blockbusters, so much that I started a film club at my current
              role.
            </p>
          </div>
        </section>
      </div>

      <!-- Right column -->
      <div
        class="md:col-span-2 pl-0 md:pl-3 print:grid print:grid-cols-none print:gap-3"
      >
        <!-- Personal Profile -->
        <section class="mb-4 print:break-inside-avoid">
          <h3
            class="text-xl text-green-600 print:text-green-600 font-semibold mb-3"
          >
            Personal Profile
          </h3>
          <div class="space-y-3 text-sm">
            <p>
              A highly experienced Senior Software Engineer with a strong
              commitment to continuous learning and professional growth. Skilled
              in designing and implementing innovative solutions to complex
              technical challenges, with a focus on delivering scalable and
              efficient software. Experienced in mentoring junior members of the
              team and fostering a collaborative environment to drive success.
              Passionate about leveraging expertise to enhance both individual
              and team performance while contributing to the overall business
              objectives.
            </p>
          </div>
        </section>

        <!-- Previous Experience -->
        <section>
          <h3
            class="text-xl text-green-600 print:text-green-600 font-semibold mb-3"
          >
            Previous Experience
          </h3>

          <!-- Ignite Software Systems -->
          <div class="mb-6 print:break-inside-avoid">
            <h4 class="font-semibold text-green-600 print:text-green-600">
              Ignite Software Systems
            </h4>
            <div class="flex justify-between items-center mb-2">
              <h5 class="font-medium">Senior Software Engineer</h5>
              <span class="text-sm text-gray-600">November 2022 - Present</span>
            </div>
            <div class="space-y-3 text-sm">
              <p>
                Worked on a white labled insurance software as a service
                product, servicing multiple tenants of various sizes. Including
                working on integrations with payment providers, aggregation
                sites, and other data providers. Also developed several areas of
                their call-centre software, and implemented a new customer
                portal.
              </p>

              <p>Key Achievements:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  Developed APIs in .Net core to service a customer facing site.
                </li>
                <li>
                  Developed a new question set package using vue and formkit to
                  be able to speed up building forms for both the call centre
                  and customer facing site.
                </li>
                <li>
                  Developed a new content driven customer facing site for
                  creating and managing insurance policies, using nuxt and
                  nuxt-content.
                </li>
                <li>
                  Mentored junior members of the team, from apprentice to mid
                  level engineers.
                </li>
                <li>
                  Aided in creating a set of code quality standards to help
                  ensure a high standard of work accross the team.
                </li>
                <li>
                  Created and modified github actions pipelines for CI and CD,
                  running automation tests and deploying packages to github.
                </li>
              </ul>
            </div>
          </div>

          <!-- musicMagpie -->
          <div class="mb-6 print:break-inside-avoid">
            <h4 class="font-semibold text-green-600 print:text-green-600">
              musicMagpie
            </h4>
            <div class="flex justify-between items-center mb-2">
              <h5 class="font-medium">Software Developer</h5>
              <span class="text-sm text-gray-600"
                >February 2021 - November 2022</span
              >
            </div>
            <div class="space-y-3 text-sm">
              <p>
                At musicMagpie, I had the opportunity to lead and contribute to
                a variety of projects, working alongside talented teams to
                deliver impactful software solutions in the e-commerce space.
                During my time there, I expanded my technical expertise and took
                on new challenges, particularly in cloud infrastructure,
                development tools, and team processes.
              </p>

              <p>Key Achievements:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  Led and collaborated on projects focused on developing .NET
                  Core APIs and Azure Functions, with deployments on Azure.
                </li>
                <li>
                  Gained experience in Infrastructure as Code using Terraform to
                  automatecloud deployments.
                </li>
                <li>
                  Worked with MySQL for the first time, gaining hands-on
                  experience in database design and optimization.
                </li>
                <li>
                  Utilized Docker to streamline local development environments,
                  improving setup times for the team.
                </li>
                <li>
                  Played a key role inadopting the Scrum framework, providing
                  insights from previous experience to optimize workflows and
                  suggesting tools to enhanceproductivity.
                </li>
              </ul>
            </div>
          </div>

          <!-- Chess ICT -->
          <div class="mb-6 print:break-inside-avoid">
            <h4 class="font-semibold text-green-600 print:text-green-600">
              Chess ICT
            </h4>
            <div class="flex justify-between items-center mb-2">
              <h5 class="font-medium">Software Developer</h5>
              <span class="text-sm text-gray-600"
                >July 2017 - February 2021</span
              >
            </div>
            <div class="space-y-3 text-sm">
              <p>
                Relocating to Manchester and joining Chess was a pivotal
                experience in both my personal and professional growth. During
                my time there, I gained significant confidence in my technical
                skills and in interacting with colleagues and stakeholders. I
                played an integral role in developing key internal systems and
                transforming our customer portal, all while building strong
                relationships across the company.
              </p>

              <p>Key Achievements:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  Contributed to the development of internal systems and took a
                  central role in transforming the customer portal.
                </li>
                <li>
                  Built strong relationships with stakeholders and colleagues,
                  collaborating both in person and through Teams.
                </li>
                <li>
                  Played a crucial role in consolidating several CRM systems to
                  provide a comprehensive view of customers.
                </li>
                <li>
                  Assisted in releasing a new version of the customer portal,
                  leveraging .NET Core APIs for the backend.
                </li>
                <li>
                  Took ownership of the direct debit management process,
                  ensuring smooth integration between the customer portal and
                  the bank.
                </li>
                <li>
                  Gained hands-on experience with a variety of technologies,
                  including VB, SQL, JavaScript, TypeScript, and C#.
                </li>
                <li>
                  Developed strong communication and stakeholder management
                  skills, including gathering requirements, demoing work, and
                  working within an agile Scrum framework.
                </li>
                <li>
                  Successfully completed an apprenticeship and earned a Software
                  Development Level 3 qualification.
                </li>
              </ul>
            </div>
          </div>

          <!-- Haltwhistle Swimming -->
          <div class="mb-6 print:break-inside-avoid">
            <h4 class="font-semibold text-green-600 print:text-green-600">
              Haltwhistle Swimming and Leisure Center
            </h4>
            <div class="flex justify-between items-center mb-2">
              <h5 class="font-medium">Lifeguard and Swimming Teacher</h5>
              <span class="text-sm text-gray-600">July 2015 - August 2017</span>
            </div>
            <div class="space-y-3 text-sm">
              <p>
                Before transitioning into software development, I spent time
                working as a lifeguard and swimming teacher, which provided
                invaluable experiences in high-pressure environments. These
                roles taught me how to stay calm under pressure, work
                effectively in teams, and develop leadership skills—all of which
                have been beneficial in my career as a software developer.
              </p>

              <p>Key Achievements:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  Worked in a high-pressure environment, learning to maintain
                  composure and perform effectively under stress.
                </li>
                <li>
                  Developed leadership skills through team collaboration,
                  guiding both colleagues and students in a dynamic setting.
                </li>
                <li>
                  Taught one-to-one and group swimming lessons, ranging from
                  toddlers to adult swimmers, helping individuals achieve their
                  personal goals.
                </li>
                <li>
                  Improved public speaking skills by instructing groups of
                  varying ages, including young children.
                </li>
                <li>
                  Gained experience in creating lesson plans, adjusting them as
                  needed to meet individual and group goals.
                </li>
              </ul>
            </div>
          </div>

          <!-- Crackers -->
          <div class="print:break-inside-avoid">
            <h4 class="font-semibold text-green-600 print:text-green-600">
              Crackers soft play
            </h4>
            <div class="flex justify-between items-center mb-2">
              <h5 class="font-medium">Leisure attendant</h5>
              <span class="text-sm text-gray-600">August 2015 - July 2017</span>
            </div>
            <div class="space-y-3 text-sm">
              <p>
                My first part-time job while in 6th form was working in customer
                service at a soft play center. This role mainly involved serving
                coffee and taking food orders. I also enjoyed interacting with
                the general public and developed strong interpersonal skills,
                especially when handling customer complaints.
              </p>

              <h3>Key Achievements:</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  Served coffee and took orders for food while providing
                  excellent customer service.
                </li>
                <li>
                  Developed strong interpersonal skills by managing customer
                  complaints and maintaining a positive atmosphere.
                </li>
                <li>
                  Learned to identify tasks that needed attention, even those
                  outside of my direct responsibilities, improving my time
                  management skills.
                </li>
                <li>
                  Gained a proactive approach to work by spotting and addressing
                  tasks before they became urgent.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  @page {
    size: A4;
    margin: 0.5cm;
  }

  /* Typography tweaks */
  body,
  html {
    font-size: 12px;
  }

  h1,
  h2,
  h3 {
    page-break-after: avoid;
  }
}
</style>
