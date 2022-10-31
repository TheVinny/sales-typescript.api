//aws config email

interface ImailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'marcosdev.working@gmail.com',
      name: 'Marcos Santana',
    },
  },
} as ImailConfig;
