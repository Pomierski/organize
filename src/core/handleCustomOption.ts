import { FileExtensions } from "../types/fileExtensions";
import { Option } from "../types/options";

type CustomCategory = {
  fileExtensions: FileExtensions;
  fileGroups: string[];
};

export const handleCustomOption = (
  option: Option
): CustomCategory | undefined => {
  if (!option) {
    return undefined;
  }
  const params = option.replace(/\s/g, "").split(",");
  if (params.length === 2) {
    const groupName = params[0];
    const fileExtension = params[1];

    return {
      fileExtensions: {
        [groupName]: fileExtension,
      },
      fileGroups: [groupName],
    };
  }

  return undefined;
};
