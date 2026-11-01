import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

let app: any = null;

export async function createApplication(props: any = {}) {
  const { container } = props;
  const root = container 
    ? container.querySelector('app-root') 
    : document.querySelector('app-root');
  
  if (!root) {
    const appRoot = document.createElement('app-root');
    if (container) {
      container.appendChild(appRoot);
    } else {
      document.body.appendChild(appRoot);
    }
  }

  return bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations()
    ]
  });
}

export function destroyApplication(appInstance: any) {
  if (appInstance && appInstance.destroy) {
    appInstance.destroy();
  }
}

// Qiankun lifecycle exports
export async function bootstrap() {
  console.log('[sub-app-angular] bootstrap');
}

export async function mount(props: any) {
  console.log('[sub-app-angular] mount', props);
  app = await createApplication(props);
}

export async function unmount() {
  console.log('[sub-app-angular] unmount');
  if (app) {
    destroyApplication(app);
    app = null;
  }
  // Clean up DOM
  const roots = document.querySelectorAll('app-root');
  roots.forEach(root => root.remove());
}

export async function update(props: any) {
  console.log('[sub-app-angular] update', props);
}

// Standalone mode
if (!(window as any).__POWERED_BY_QIANKUN__) {
  createApplication().catch(err => console.error(err));
} else {
  // Qiankun mode - expose lifecycle functions on window
  (window as any)['sub-app-angular'] = {
    bootstrap,
    mount,
    unmount,
    update
  };
}

