# Guía de Pruebas para React + TypeScript

## 🏗️ Estructura del Proyecto y Organización de Pruebas

La estructura del proyecto sigue un patrón de organización por características (feature-based) con pruebas colocalizadas junto al código que prueban. Aquí está la estructura recomendada:

```
src/
│
# Archivos raíz
├── main.tsx                    # Punto de entrada de la aplicación
├── main.test.tsx               # Pruebas de renderizado inicial
├── index.css                   # Estilos globales
├── routeTree.gen.ts            # Rutas generadas por TanStack Router
├── vite-env.d.ts               # Tipos de Vite
├── config.ts                   # Configuraciones globales
├── config.test.ts              # Pruebas de configuración
│
# Rutas y características
├── routes/
│   ├── __root.tsx              # Layout raíz de la aplicación
│   ├── __root.test.tsx         # Pruebas del layout raíz
│   │
│   # Layout Público
│   ├── _publicLayout/
│   │   ├── index.tsx           # Página de inicio
│   │   ├── index.test.tsx      # Pruebas de la página de inicio
│   │   └── auth/               # Autenticación
│   │       ├── login.tsx       # Página de login
│   │       ├── login.test.tsx  # Pruebas de login
│   │       ├── register.tsx    # Página de registro
│   │       ├── register.test.tsx # Pruebas de registro
│   │       │
│   │       # API
│   │       ├── _api/
│   │       │   ├── fetch-login.ts
│   │       │   ├── fetch-login.test.ts
│   │       │   ├── fetch-register.ts
│   │       │   └── fetch-register.test.ts
│   │       │
│   │       # Componentes
│   │       ├── _components/
│   │       │   ├── LoginForm.tsx
│   │       │   ├── LoginForm.test.tsx
│   │       │   ├── RegisterForm.tsx
│   │       │   └── RegisterForm.test.tsx
│   │       │
│   │       # Hooks
│   │       ├── _hooks/
│   │       │   └── useAuthForm.ts
│   │       │   └── useAuthForm.test.ts
│   │       │
│   │       # Tipos
│   │       └── _types/
│   │           └── auth.types.ts
│   │
│   # Layout de Productos (requiere autenticación)
│   └── _productLayout/
│       ├── products/
│       │   ├── index.tsx       # Lista de productos
│       │   ├── index.test.tsx  # Pruebas de lista de productos
│       │   ├── new.tsx         # Crear nuevo producto
│       │   ├── new.test.tsx    # Pruebas de creación
│       │   └── $productId/     # Producto específico (ruta dinámica)
│       │       ├── index.tsx   # Vista de detalle
│       │       ├── index.test.tsx # Pruebas de detalle
│       │       ├── edit.tsx    # Editar producto
│       │       └── edit.test.tsx  # Pruebas de edición
│       │
│       # API de productos
│       ├── _api/
│       │   ├── fetch-products.ts
│       │   ├── fetch-products.test.ts
│       │   ├── update-product.ts
│       │   └── update-product.test.ts
│       │
│       # Componentes de productos
│       ├── _components/
│       │   ├── ProductList.tsx
│       │   ├── ProductList.test.tsx
│       │   ├── ProductForm.tsx
│       │   └── ProductForm.test.tsx
│       │
│       # Hooks de productos
│       └── _hooks/
│           └── useProducts.ts
│           └── useProducts.test.ts
│
# Componentes globales
├── components/
│   # Componentes de UI (ShadCN)
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── button.test.tsx
│   │   ├── input.tsx
│   │   ├── input.test.tsx
│   │   ├── form.tsx
│   │   └── form.test.tsx
│   │
│   # Componentes reutilizables
│   ├── ImageUploaderField.tsx
│   ├── ImageUploaderField.test.tsx
│   ├── Spinner.tsx
│   └── Spinner.test.tsx
│
# Utilidades y configuraciones
├── lib/
│   ├── api.ts                 # Configuración de API cliente
│   ├── api.test.ts            # Pruebas de la API
│   ├── utils.ts               # Funciones de utilidad
│   └── utils.test.ts          # Pruebas de utilidades
│
# Mocks para pruebas
├── mocks/
│   ├── handlers.ts            # Handlers de MSW
│   └── server.ts              # Configuración del servidor de mocks
│
# Tipos globales
├── types/
│   └── global.d.ts
│
# Configuración de pruebas
└── tests/
    ├── setupTests.ts          # Configuración global de pruebas
    ├── test-utils.tsx         # Utilidades para pruebas
    │
    # Pruebas de integración
    └── integration/

# Pruebas End-to-End (E2E)
├── e2e/
│   ├── config/                # Configuraciones de Playwright
│   │   ├── playwright.config.ts
│   │   └── tsconfig.json
│   │
│   # Helpers y utilidades
│   ├── helpers/
│   │   ├── auth.ts           # Utilidades de autenticación
│   │   └── navigation.ts     # Utilidades de navegación
│   │
│   # Páginas del sitio
│   ├── pages/
│   │   ├── login.page.ts
│   │   ├── products.page.ts
│   │   └── product-details.page.ts
│   │
│   # Tests E2E
│   ├── specs/
│   │   ├── auth/
│   │   │   ├── login.spec.ts
│   │   │   └── register.spec.ts
│   │   │
│   │   └── products/
│   │       ├── product-crud.spec.ts
│   │       └── product-list.spec.ts
│   │
│   # Fixtures y mocks
│   ├── fixtures/
│   │   ├── test-user.json
│   │   └── test-products.json
│   │
│   # Configuración de reportes
│   └── reports/
│       ├── html/
│       └── junit/

### 📁 Ubicación de las Pruebas

1. **Pruebas Unitarias**: Junto al archivo que están probando con extensión `.test.ts` o `.test.tsx`
   - `Component.tsx` → `Component.test.tsx`
   - `utils.ts` → `utils.test.ts`

2. **Pruebas de Integración**: En carpetas `__tests__` dentro de las carpetas de características
   - `features/auth/__tests__/login.integration.test.ts`

3. **Pruebas E2E**: En la carpeta `e2e/` en la raíz del proyecto
   - `e2e/specs/auth/login.spec.ts`
   - `e2e/specs/products/product-crud.spec.ts`

### 🔍 Ejemplo de Pruebas E2E

#### 1. Configuración de Playwright (`e2e/config/playwright.config.ts`)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../specs',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: '../reports/html' }],
    ['junit', { outputFile: '../reports/junit/results.xml' }]
  ],
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

#### 2. Page Object Model (`e2e/pages/login.page.ts`)

```typescript
import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Elementos
  private emailInput = this.page.locator('input[name="email"]');
  private passwordInput = this.page.locator('input[name="password"]');
  private submitButton = this.page.locator('button[type="submit"]');
  private errorMessage = this.page.locator('.error-message');

  // Acciones
  async goto() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // Aserciones
  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectSuccessfulLogin() {
    await this.page.waitForURL('/dashboard');
    await expect(this.page).toHaveURL('/dashboard');
  }
}
```

#### 3. Test de Inicio de Sesión (`e2e/specs/auth/login.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { testUser } from '../../fixtures/test-user';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('debe permitir el inicio de sesión con credenciales válidas', async () => {
    await loginPage.login(
      testUser.valid.email,
      testUser.valid.password
    );
    await loginPage.expectSuccessfulLogin();
  });

  test('debe mostrar un error con credenciales inválidas', async () => {
    await loginPage.login(
      'usuario@invalido.com',
      'contraseña-incorrecta'
    );
    await loginPage.expectErrorMessage('Credenciales inválidas');
  });
});
```

#### 4. Fixture de Datos de Prueba (`e2e/fixtures/test-user.ts`)

```typescript
export const testUser = {
  valid: {
    email: 'test@example.com',
    password: 'Test1234!',
    name: 'Test User'
  },
  invalid: {
    email: 'invalid@example.com',
    password: 'wrongpass'
  }
};
```

### 🚀 Ejecutando las Pruebas E2E

1. Instalar dependencias:
   ```bash
   npm install -D @playwright/test
   ```

2. Configurar scripts en `package.json`:
   ```json
   {
     "scripts": {
       "test:e2e": "playwright test",
       "test:e2e:ui": "playwright test --ui",
       "test:e2e:report": "playwright show-report"
     }
   }
   ```

3. Ejecutar pruebas:
   ```bash
   # Ejecutar todas las pruebas
   npm run test:e2e

   # Modo interfaz gráfica
   npm run test:e2e:ui

   # Ver reporte HTML
   npm run test:e2e:report
   ```

### 📊 Reportes

Los reportes generados incluyen:
- Capturas de pantalla en fallos
- Trazas de ejecución
- Tiempos de respuesta
- Logs de consola
- Solicitudes de red

## 🔧 Configuración Inicial

### 📦 Dependencias Recomendadas

```bash
# Testing base
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Para mockear fetch / API
npm install -D msw

# Tipado
npm install -D @types/jest @types/testing-library__jest-dom

# Para probar hooks
npm install -D @testing-library/react-hooks

# Para pruebas E2E (opcional)
npm install -D @playwright/test
```

### ⚙️ Configuración de Vitest

**vite.config.ts:**
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### 🛠 Configuración de MSW (Mock Service Worker)

**src/mocks/handlers.ts:**
```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
      ])
    );
  }),
];

// Configura el servidor de mocks con los manejadores
export const server = setupServer(...handlers);
```

**src/setupTests.ts:**
```typescript
import { server } from './mocks/server';
import '@testing-library/jest-dom';

// Iniciar el servidor de mocks antes de las pruebas
beforeAll(() => server.listen());

// Restablecer cualquier solicitud que hayamos agregado durante las pruebas
// para que no afecten a otras pruebas
afterEach(() => server.resetHandlers());

// Limpiar después de que terminen las pruebas
afterAll(() => server.close());
```

### 🎭 Configuración de Playwright (E2E)

**playwright.config.ts:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 📝 Scripts de Prueba

**package.json:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## 🔍 Tipos de Pruebas

### 1. Pruebas Unitarias

**Qué probar:**
- Funciones puras (helpers, utils)
- Validaciones con Zod
- Mutaciones de estado en Zustand

**Ejemplo de prueba para Zustand Store (store.test.ts):**
```typescript
import { useStore } from '../store';

describe('Zustand Store', () => {
  beforeEach(() => {
    // Resetear el estado antes de cada prueba
    useStore.setState(useStore.getInitialState());
  });

  it('debería manejar el contador correctamente', () => {
    // Estado inicial
    useStore.setState({ count: 0 });
    
    // Acción
    useStore.getState().increment();
    
    // Aserción
    expect(useStore.getState().count).toBe(1);
  });

  it('debería manejar la autenticación', () => {
    // Mock de datos de usuario
    const mockUser = { 
      id: '1', 
      name: 'Usuario de Prueba',
      email: 'test@example.com' 
    };

    // Acción
    useStore.getState().login(mockUser);
    
    // Aserciones
    const { user, isAuthenticated } = useStore.getState();
    expect(isAuthenticated).toBe(true);
    expect(user).toEqual(mockUser);
    
    // Probar logout
    useStore.getState().logout();
    expect(useStore.getState().isAuthenticated).toBe(false);
    expect(useStore.getState().user).toBeNull();
  });

  it('debería manejar el estado de carga', () => {
    // Estado inicial
    expect(useStore.getState().isLoading).toBe(false);
    
    // Acción
    useStore.getState().setLoading(true);
    expect(useStore.getState().isLoading).toBe(true);
    
    useStore.getState().setLoading(false);
    expect(useStore.getState().isLoading).toBe(false);
  });
});
```

**Consejos para probar Zustand:**
1. Usa `beforeEach` para resetear el estado entre pruebas
2. Prueba tanto las acciones como los selectores
3. Verifica los cambios de estado después de cada acción
4. Prueba los casos límite y estados de error
5. Considera usar `zustand/testing` para mocks más avanzados

**Ejemplo (utils.test.ts):**
```typescript
import { formatPrice } from '../lib/utils';

describe('formatPrice', () => {
  it('formats price correctly', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
    expect(formatPrice(0)).toBe('$0.00');
  });
});
```

### 2. Pruebas de Componentes

**Qué probar:**
- Render de UI con React Testing Library
- Props y estados locales
- Interacciones del usuario

**Ejemplo (Button.test.tsx):**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/ui/button';

describe('Button', () => {
  it('renders with correct text and handles click', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 3. Pruebas de Integración

**Qué probar:**
- Queries y Mutations con TanStack Query
- Navegación con TanStack Router
- Integración entre componentes

**Ejemplo (ProductList.test.tsx):**
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductList } from '../components/ProductList';
import { server } from '../mocks/server';

const queryClient = new QueryClient();

describe('ProductList', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('displays products after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
});
```

### 4. Pruebas de API con MSW

**Ejemplo de prueba de API:**
```typescript
import { server, rest } from '../mocks/server';
import { fetchProducts } from '../api/products';

describe('API Tests', () => {
  it('fetches products successfully', async () => {
    const products = await fetchProducts();
    expect(products).toHaveLength(2);
    expect(products[0].name).toBe('Product 1');
  });
});
```

### 5. Pruebas de Rutas con TanStack Router

**Ejemplo (routes.test.tsx):**
```typescript
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../routes';

describe('Router', () => {
  it('renders the home page', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
  });
});
```

### 6. Pruebas E2E con Playwright

**Ejemplo de prueba E2E (e2e/home.spec.ts):**
```typescript
import { test, expect } from '@playwright/test';

test('navegación básica', async ({ page }) => {
  // Ir a la página de inicio
  await page.goto('/');
  
  // Verificar que estamos en la página correcta
  await expect(page).toHaveTitle('Mi Aplicación');
  
  // Navegar a la página de productos
  await page.click('text=Productos');
  
  // Verificar que se cargaron los productos
  await expect(page.locator('.product-item')).toHaveCountGreaterThan(0);
});
```

## 📌 Mejores Prácticas

1. **Nombrado de pruebas**: Usa nombres descriptivos que expliquen qué y por qué se está probando.
2. **AAA Pattern**: Organiza tus pruebas en Arrange-Act-Assert.
3. **Mocks**: Usa mocks para dependencias externas y APIs.
4. **Pruebas aisladas**: Cada prueba debe ser independiente de las demás.
5. **Pruebas deterministas**: Asegúrate de que las pruebas sean consistentes.
6. **Cobertura útil**: No persigas el 100% de cobertura, enfócate en lo importante.

## 🔍 Depuración

- Usa `console.log` o `debug()` de Testing Library.
- En VS Code, configura el lanzador de depuración para pruebas.
- Usa `--ui` para la interfaz de Vitest: `npm run test:ui`

## 📚 Recursos Adicionales

- [Documentación de Testing Library](https://testing-library.com/)
- [Guía de Vitest](https://vitest.dev/guide/)
- [MSW - API Mocking](https://mswjs.io/)
- [Playwright E2E Testing](https://playwright.dev/)
- [TanStack Query Testing](https://tanstack.com/query/latest/docs/react/guides/testing)
