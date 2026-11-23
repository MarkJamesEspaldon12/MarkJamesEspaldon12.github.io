// ===== EDIT YOUR CONTENT HERE =====
// To update your resume: replace assets/resume.pdf (keep the same name) and push.
// Project images: put them in assets/img/ and list them in "images".
// Missing images show a text slide instead, so the site never looks broken.
const DATA = {
  name: "Mark James D. Espaldon",
  role: "Junior DevOps Engineer",
  location: "Mandaluyong City, Metro Manila",
  email: "mjespaldon12@gmail.com",
  github: "https://github.com/",          // TODO: your GitHub URL
  linkedin: "https://www.linkedin.com/",  // TODO: your LinkedIn URL
  formspree: "https://formspree.io/f/YOUR_FORM_ID", // TODO: create a form at formspree.io
  about: "IT graduate with hands-on training in Linux, Bash, Git/GitHub, Docker, NGINX, Tomcat, AWS, GCP, and Terraform. Backed by internship experience in Linux server support, troubleshooting, and testing. Comfortable at the command line, reading errors, and fixing issues step by step. Open to on-site, hybrid, or remote roles.",
  skills: ["Linux", "Bash", "Python", "PowerShell", "Git / GitHub", "GitHub Actions", "Docker", "Docker Compose", "AWS", "GCP", "Terraform", "NGINX", "Apache Tomcat", "Maven", "MySQL", "Jira"],
  projects: [
    {
      title: "Cloud Web Servers with Terraform & GitHub Actions",
      year: "2026",
      tags: ["Terraform", "AWS", "GCP", "GitHub Actions"],
      desc: "Provisioned an AWS EC2 web server (security group, NGINX via user data) and a GCP Compute Engine VM with Terraform using variables, outputs, and S3 remote state. A GitHub Actions workflow runs terraform plan on PRs and apply on merge to main, with secrets in GitHub Secrets.",
      images: ["assets/img/terraform-1.png", "assets/img/terraform-2.png", "assets/img/terraform-3.png"],
      link: ""
    },
    {
      title: "CI/CD Pipeline: Lint, Test, Build & Push",
      year: "2024",
      tags: ["GitHub Actions", "Docker", "Docker Hub"],
      desc: "Helped build GitHub Actions pipelines that lint, test, build, and push Docker images to Docker Hub, using branch protection and pull request workflow. Docker Compose for local app and database setups.",
      images: ["assets/img/cicd-1.png", "assets/img/cicd-2.png"],
      link: ""
    },
    {
      title: "NGINX Reverse Proxy for Tomcat Apps",
      year: "2024",
      tags: ["Linux", "NGINX", "Tomcat", "UFW"],
      desc: "Set up an Ubuntu Server VM with a sudo admin user and SSH key-only login, installed NGINX as a reverse proxy for Java apps on Apache Tomcat, and locked the firewall to ports 22 and 80 with UFW.",
      images: ["assets/img/nginx-1.png", "assets/img/nginx-2.png"],
      link: ""
    },
    {
      title: "Server Health Check & Log Cleanup Scripts",
      year: "2024",
      tags: ["Bash", "Python", "PowerShell", "cron"],
      desc: "Bash scripts checking disk, memory, CPU, and website status, plus Python and PowerShell scripts for log retention and file cleanup, all scheduled with crontab.",
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
