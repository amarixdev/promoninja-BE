import { ReactNode, createContext, useContext, useState } from "react";

interface ContextType {
  categoryType: string;
  setCategoryType: React.Dispatch<
    React.SetStateAction<string | undefined | any>
  >;
  categoryIndex: number;
  setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;

  currentPage: CurrentPage;
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>;
}

export interface CurrentPage {
  home: boolean;
  search: boolean;
  podcasts: boolean;
  offers: boolean;
}

const AppContext = createContext<ContextType>({
  categoryType: {} as string,
  setCategoryType: () => {},
  currentPage: {} as {
    home: boolean;
    search: boolean;
    podcasts: boolean;
    offers: boolean;
  },
  setCurrentPage: () => {},
  setCategoryIndex: () => {},
  categoryIndex: {} as number,
});

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  const [categoryType, setCategoryType] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState<CurrentPage>({
    home: true,
    podcasts: false,
    search: false,
    offers: false,
  });
  return (
    <AppContext.Provider
      value={{
        categoryType,
        setCategoryType,
        categoryIndex,
        setCategoryIndex,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const NavContext = () => {
  return useContext(AppContext);
};
