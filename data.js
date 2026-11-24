// ===== EDIT YOUR CONTENT HERE =====
// To update your resume: replace assets/resume.pdf (keep the same name) and push.
// Project images: put them in assets/img/ and list them in "images".
// Missing images show a text slide instead, so the site never looks broken.
const DATA = {
  name: "Mark James D. Espaldon",
  role: "Junior DevOps Engineer",
  location: "Mandaluyong City, Metro Manila",
  email: "mjespaldon12@gmail.com",
  github: "https://github.com/MarkJamesEspaldon12",
  linkedin: "",
  formspree: "https://formspree.io/f/YOUR_FORM_ID",
  about: "IT graduate with hands-on training in Linux, Bash, Git/GitHub, GitHub Actions, Docker, NGINX, Tomcat, and GCP basics, backed by internship experience in Linux server support and testing. Comfortable at the command line, reading errors, and fixing issues step by step. Currently learning AWS and Terraform. Open to on-site, hybrid, or remote roles.",
  skills: ["Linux", "Bash", "Python", "PowerShell", "Git / GitHub", "GitHub Actions", "Docker", "Docker Compose", "NGINX", "Apache Tomcat", "Maven", "GCP (gcloud, IAM)", "MySQL", "Jira"],
  projects: [
    {
      title: "DevOps Portfolio with FAQ Chatbot on GitHub Pages",
      year: "2026",
      tags: ["GitHub Actions", "GitHub Pages", "JavaScript", "Git"],
      desc: "This site. A browser-only FAQ chatbot (no API, zero cost) answers from the same data file as the page. Changes go through feature branches and pull requests; a GitHub Actions workflow checks the files, then deploys to GitHub Pages on merge to main.",
      images: ["assets/img/site-1.png", "assets/img/site-2.png"],
      link: "https://github.com/MarkJamesEspaldon12/MarkJamesEspaldon12.github.io"
    },
    {
      title: "CI/CD Pipeline: Lint, Test, Build & Push",
      year: "2026",
      tags: ["GitHub Actions", "Docker", "Docker Hub", "pytest"],
      desc: "One pipeline for a Python app: flake8 and pytest run on every pull request; on merge to main it builds a Docker image and pushes it to Docker Hub tagged with the commit SHA. Protected main branch (required check + PR), secrets in GitHub Secrets, and dev/staging/prod environments with a manual approval gate for prod.",
      images: ["assets/img/cicd-1.png", "assets/img/cicd-2.png"],
      link: "https://github.com/MarkJamesEspaldon12/cicd-lab"
    },
    {
      title: "Java App on Tomcat behind NGINX, with Release & Rollback",
      year: "2026",
      tags: ["Docker Compose", "NGINX", "Tomcat", "Maven", "GitFlow"],
      desc: "Multi-stage Docker build compiles a Maven WAR and runs it on Tomcat behind an NGINX reverse proxy, with only the proxy port exposed. Releases follow GitFlow (release/ and hotfix/ branches, annotated tags); the WAR is built from a tag, and rollback means redeploying the previous tag.",
      images: ["assets/img/tomcat-1.png", "assets/img/tomcat-2.png"],
      link: ""
    },
    {
      title: "Linux Server Scripts: Disk Alert & Network Check",
      year: "2026",
      tags: ["Bash", "Linux", "cron", "exit codes"],
      desc: "disk_alert.sh checks disk usage against a threshold, logs every run, and returns exit codes that monitoring tools can read. A layered network check (DNS, ping, port, HTTP) writes a report for incident tickets.",
      images: ["assets/img/scripts-1.png", "assets/img/scripts-2.png"],
      link: ""
    }
  ],
  experience: [
    {
      title: "System Admin Intern",
      org: "PIXEL8 Web Solution & Consultancy Inc.",
      date: "Feb – Jun 2024",
      points: [
        "Checked logs on the Linux staging server over SSH (tail, grep) and ran MySQL queries to trace issues.",
        "Troubleshot services with nginx -t, systemctl, and journalctl; kept VM snapshots as restore points.",
        "Tested features and APIs on staging (Postman, curl) with UAT test cases; tracked issues in Jira.",
        "Wrote deployment and user guides, versioned in Git."
      ]
    }
  ],
  education: "BS Information Technology, STI College Legazpi (2021 – 2024)"
};
// TODO remove me
