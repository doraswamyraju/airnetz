import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.airnetz.mobile',
  appName: 'Airnetz Admin',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
