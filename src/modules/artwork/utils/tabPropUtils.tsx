// Capitalize the first letter of each word
export const a11yProps = (index:number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  };