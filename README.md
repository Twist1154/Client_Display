# Client Display Application

[![CI/CD Pipeline](https://github.com/Twist1154/Client_Display/actions/workflows/ci.yml/badge.svg)](https://github.com/Twist1154/Client_Display/actions/workflows/ci.yml)
[![Deploy to Production](https://github.com/Twist1154/Client_Display/actions/workflows/deploy.yml/badge.svg)](https://github.com/Twist1154/Client_Display/actions/workflows/deploy.yml)
[![Maintenance & Security](https://github.com/Twist1154/Client_Display/actions/workflows/maintenance.yml/badge.svg)](https://github.com/Twist1154/Client_Display/actions/workflows/maintenance.yml)

A modern web-based client display application with comprehensive CI/CD pipeline and automated build processes.

## 🚀 Features

- **Modern Web Stack**: Built with vanilla JavaScript, Webpack, and modern tooling
- **Automated CI/CD**: Full GitHub Actions pipeline for testing, building, and deployment
- **Code Quality**: ESLint, Prettier, and automated formatting
- **Testing**: Jest-based testing with coverage reports
- **Security**: Automated security audits and dependency monitoring
- **Build Automation**: Comprehensive build scripts and validation

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v6 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/Twist1154/Client_Display.git
cd Client_Display

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run validate` | Run all quality checks (lint, format, test) |
| `npm run clean` | Clean build artifacts |

## 🔧 Build Automation

### Build Scripts

- **`scripts/build.sh`**: Comprehensive build script with validation
- **`scripts/test.sh`**: Full test suite execution with coverage

### CI/CD Pipeline

The project includes three GitHub Actions workflows:

#### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)
- **Triggers**: Push to main/develop, Pull requests
- **Jobs**:
  - **Lint**: Code quality checks (ESLint, Prettier)
  - **Test**: Unit tests with coverage reporting
  - **Build**: Application build and artifact upload
  - **Security**: Security audit and dependency checks

#### 2. Deployment (`.github/workflows/deploy.yml`)
- **Triggers**: Push to main branch, Git tags
- **Features**:
  - Production build and deployment
  - GitHub Pages deployment
  - Automated release creation
  - Deployment notifications

#### 3. Maintenance (`.github/workflows/maintenance.yml`)
- **Triggers**: Daily schedule (2 AM UTC), Manual trigger
- **Features**:
  - Daily security audits
  - Dependency updates monitoring
  - Code quality analysis
  - Application health checks

## 🧪 Testing

The project uses Jest for testing with the following setup:

- **Unit Tests**: Located in `tests/` directory
- **Coverage**: Automatic coverage reporting
- **DOM Testing**: jsdom environment for DOM manipulation tests

Run tests:
```bash
# Single run
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

## 🔒 Security

### Automated Security Measures

- **Daily Security Audits**: Automated npm audit checks
- **Dependency Monitoring**: Regular dependency update checks
- **Code Quality Gates**: Mandatory quality checks in CI
- **Vulnerability Scanning**: Integrated security scanning

### Security Best Practices

- Regular dependency updates
- Security audit integration
- Code review requirements
- Automated vulnerability detection

## 📈 Code Quality

### Quality Tools

- **ESLint**: JavaScript linting with custom rules
- **Prettier**: Code formatting and style consistency
- **EditorConfig**: Consistent coding styles across editors
- **Git Hooks**: Pre-commit quality checks (optional)

### Quality Standards

- 100% test coverage goal
- Zero ESLint errors policy
- Consistent code formatting
- Comprehensive documentation

## 🚀 Deployment

### Automatic Deployment

- **GitHub Pages**: Automatic deployment on main branch push
- **Release Management**: Automated releases on version tags
- **Environment Management**: Production environment configuration

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy build artifacts from dist/ directory
```

## 📊 Monitoring

### Build Status

All builds are monitored through GitHub Actions with:

- **Build Status Badges**: Real-time build status
- **Coverage Reports**: Test coverage tracking
- **Security Alerts**: Vulnerability notifications
- **Performance Metrics**: Build time and artifact size tracking

### Health Checks

- Daily application health verification
- Build artifact validation
- Dependency security monitoring
- Code quality trend analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run quality checks (`npm run validate`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Workflow

1. **Code Changes**: Make your modifications
2. **Quality Checks**: Run `npm run validate`
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update relevant documentation
5. **Pull Request**: Submit for review

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Actions](https://github.com/Twist1154/Client_Display/actions)
- [Issues](https://github.com/Twist1154/Client_Display/issues)
- [Pull Requests](https://github.com/Twist1154/Client_Display/pulls)