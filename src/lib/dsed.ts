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

  logd(`filepath=${filepath}`);
  logd(`expressions=`, expressions);
  logd(`inPlace=${inPlace}`);

  if (!fs.existsSync(filepath)) {
    console.error(`Error: File not found: ${filepath}`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(filepath, 'utf8');
    let updatedContent = content;

    expressions.forEach((expression: string) => {
      expression = expression.replace(/^['"]|['"]$/g, ''); // Remove extra quotes
      const regex = /^s\/(.*?)\/(.*?)\/$/; // Match general patterns
      const match = expression.match(regex);

      if (match) {
        const searchValue = match[1];
        const replaceValue = match[2];
        logd(`searchValue=${searchValue}, replaceValue=${replaceValue}`);
        updatedContent = updatedContent.replace(
          new RegExp(searchValue, 'g'), // Directly apply the pattern
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
