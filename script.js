document.addEventListener("DOMContentLoaded", async function() {
  try {
    const res = await fetch("./portfolio-data.json");
    const data = await res.json();
    
    document.documentElement.style.setProperty("--primary-color", data.settings.primaryColor);
    
    const app = document.getElementById("app");
    app.innerHTML = `
      <!-- Hero Section -->
      <section class="py-20 px-4 text-center bg-gradient-to-br from-blue-50 to-white">
        <div class="max-w-4xl mx-auto">
          <img src="${data.settings.profileImage}" alt="${data.settings.name}" class="w-32 h-32 rounded-full mx-auto mb-6 object-cover" />
          <h1 class="text-4xl md:text-6xl font-bold mb-4">${data.settings.name}</h1>
          <p class="text-xl md:text-2xl dynamic-primary mb-4">${data.settings.title}</p>
          <p class="text-gray-600 mb-2">${data.settings.location}</p>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto">${data.settings.summary}</p>
        </div>
      </section>

      ${data.sections.about.enabled ? `
      <section class="py-16 px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">${data.sections.about.title}</h2>
          <p class="text-lg text-gray-700 mb-8">${data.sections.about.content}</p>
          ${data.sections.about.skills.enabled ? `
          <div>
            <h3 class="text-xl font-semibold mb-4">${data.sections.about.skills.title}</h3>
            <div class="flex flex-wrap gap-2">
              ${data.sections.about.skills.items.map(skill => `<span class="px-3 py-1 bg-primary-light dynamic-primary rounded-full text-sm font-medium">${skill}</span>`).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      </section>
      ` : ''}

      ${data.sections.experience.enabled ? `
      <section class="py-16 px-4 bg-gray-50">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">${data.sections.experience.title}</h2>
          <div class="space-y-6">
            ${data.sections.experience.items.map(item => `
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold dynamic-primary">${item.position}</h3>
              <p class="text-lg font-medium text-gray-800">${item.company}</p>
              <p class="text-gray-600 mb-3">${item.period}</p>
              <p class="text-gray-700">${item.description}</p>
            </div>
            `).join('')}
          </div>
        </div>
      </section>
      ` : ''}

      ${data.sections.projects.enabled ? `
      <section class="py-16 px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">${data.sections.projects.title}</h2>
          <div class="grid gap-6 md:grid-cols-2">
            ${data.sections.projects.items.map(project => `
            <div class="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-3 dynamic-primary">${project.title}</h3>
              <p class="text-gray-700 mb-4">${project.description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                ${project.tags.map(tag => `<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">${tag}</span>`).join('')}
              </div>
              ${project.previewUrl !== '#' ? `<a href="${project.previewUrl}" class="dynamic-primary font-medium hover:underline">View Project →</a>` : ''}
            </div>
            `).join('')}
          </div>
        </div>
      </section>
      ` : ''}

      ${data.sections.contact.enabled ? `
      <section class="py-16 px-4 bg-gray-50">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-8">${data.sections.contact.title}</h2>
          <div class="space-y-4">
            <p class="text-lg"><strong>Email:</strong> <a href="mailto:${data.sections.contact.email}" class="dynamic-primary hover:underline">${data.sections.contact.email}</a></p>
            <p class="text-lg"><strong>Phone:</strong> ${data.sections.contact.phone}</p>
            <p class="text-lg"><strong>Location:</strong> ${data.sections.contact.location}</p>
          </div>
        </div>
      </section>
      ` : ''}

      ${data.footer.enabled ? `
      <footer class="py-8 px-4 text-center text-gray-600 border-t">
        <p>${data.footer.copyright}</p>
      </footer>
      ` : ''}
    `;
  } catch (err) {
    console.error("Error loading portfolio:", err);
    document.getElementById("app").innerHTML = "<h1>Error loading portfolio</h1>";
  }
});