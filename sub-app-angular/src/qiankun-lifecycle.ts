import { createApplication, destroyApplication } from './main';

let app: any = null;

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
}

export async function update(props: any) {
  console.log('[sub-app-angular] update', props);
}
