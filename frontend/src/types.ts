
export interface Ticket {
    id: string;
    content: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    items: string[];
  }
  
  export interface Columns {
    [key: string]: Column;
  }
  