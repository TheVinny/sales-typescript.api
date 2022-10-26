import Handlebars from 'handlebars';
import { promises } from 'fs';

interface IVariables {
  [key: string]: string | number;
}

interface IParse {
  file: string;
  variables: IVariables;
}

class MailTemplate {
  public async parse({ file, variables }: IParse): Promise<string> {
    const templateFileContent = await promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = Handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default MailTemplate;
