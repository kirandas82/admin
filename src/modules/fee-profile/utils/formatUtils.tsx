// Capitalize the first letter of each word
export const capitalizeName = (name:any) => {
    return name
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };