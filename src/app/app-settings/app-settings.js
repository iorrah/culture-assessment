let baseName = '/culture-assessment';

const dev = [
  'development',
  'test',
];

let env = process.env.NODE_ENV;

if (dev.indexOf(env) > -1) {
  baseName = '';
}

const AppSettings = {
  base_name: baseName,
};

export default AppSettings;
