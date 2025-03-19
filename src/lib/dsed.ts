import fs from 'fs';
import { DateTime } from 'luxon';

const calcReplaceValue = (
  replaceValue: string,
  searchValue: string,
  updatedContent: string,
  pattern: string
): string => {
  if (replaceValue.includes('${$1+1}')) {
    // console.log(`calc`);
    // Extract the value of (.*) from updatedContent
    const match = updatedContent.match(searchValue);
    // console.log(`match`, match);
    if (match && match[1]) {
      const n1 = parseInt(match[1], 10); // Convert the matched value to an integer
      const incrementedValue = n1 + 1; // Increment the value
      // console.log(
      //   `incrementedValue=${incrementedValue}, replaceValue=${replaceValue}`
      // );

      // Replace "{$1+1}" in replaceValue with the calculated value
      replaceValue = replaceValue.replace('${$1+1}', `${incrementedValue}`);
    }
  }
  return replaceValue;
};

export const dsed = async (
  filepath: string,
  expressions: string[],
  inPlace: boolean,
  useVariable: boolean,
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

    // Get current UTC datetime in ISO format without milliseconds
    const now = DateTime.local();
    const utcnow = now.toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
    const localNow = now.toFormat('yyyy-MM-dd HH:mm:ss'); // e.g., "2025-03-19 08:44:10"
    const localDate = now.toFormat('yyyy-MM-dd'); // e.g., "2025-03-19"
    const date8 = now.toFormat('yyyyMMdd'); // e.g., 20250319
    const datetime15 = now.toFormat('yyyyMMdd_HHmmss'); // e.g., 20250319_084410

    expressions.forEach((expression: string) => {
      expression = expression.replace(/^['"]|['"]$/g, ''); // Remove extra quotes
      const regex = /^s\/(.*?)\/(.*?)\/$/; // Match substitution pattern
      const match = expression.match(regex);

      if (match) {
        let searchValue = match[1];
        let replaceValue = match[2];

        replaceValue = calcReplaceValue(
          replaceValue,
          searchValue,
          updatedContent,
          '${$1+1}'
        );

        if (useVariable) {
          if (replaceValue.includes('${utcnow}')) {
            replaceValue = replaceValue.replace('${utcnow}', utcnow);
          }
          if (replaceValue.includes('${now}')) {
            replaceValue = replaceValue.replace('${now}', localNow);
          }
          if (replaceValue.includes('${date}')) {
            replaceValue = replaceValue.replace('${date}', localDate);
          }
          if (replaceValue.includes('${date8}')) {
            replaceValue = replaceValue.replace('${date8}', date8);
          }
          if (replaceValue.includes('${datetime15}')) {
            replaceValue = replaceValue.replace('${datetime15}', datetime15);
          }
        }

        logd(`searchValue=${searchValue}, replaceValue=${replaceValue}`);
        updatedContent = updatedContent.replace(
          new RegExp(searchValue, 'g'), // Apply the search pattern globally
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
