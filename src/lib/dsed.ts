import fs from 'fs';

export const dsed = async (
  filepath: string,
  expressions: string[],
  inPlace: boolean,
  isDebug: boolean
): Promise<void> => {
  const logd = (...args: any[]) => {
    if (isDebug) {
      console.log(...args);
    }
  };
  if (!expressions || expressions.length === 0) {
    console.error('Error: No expressions provided.');
    process.exit(1);
  }
  if (isDebug) {
    logd(`filepath=${filepath}`);
    logd(`expressions=`, expressions);
    logd(`inPlace=${inPlace}`);
  }

  try {
    const content = fs.readFileSync(filepath, 'utf8');
    let updatedContent = content;

    expressions.forEach((expression: string) => {
      expression = expression.replace(/^['"]|['"]$/g, '');
      const regex = /^s\/(.+?)\/(.+?)\/$/;
      const match = expression.match(regex);
      if (match) {
        const searchValue = match[1];
        const replaceValue = match[2];
        logd(`searchValue=${searchValue}, replaceValue=${replaceValue}`);
        updatedContent = updatedContent.replace(
          new RegExp(searchValue, 'g'),
          replaceValue
        );
      } else {
        console.error(`Invalid expression: ${expression}`);
        process.exit(1);
      }
    });

    if (inPlace) {
      fs.writeFileSync(filepath, updatedContent, 'utf8');
    } else {
      console.log(updatedContent);
    }
  } catch (err) {
    console.error(`Error processing file: ${(err as Error).message}`);
    process.exit(1);
  }
};
