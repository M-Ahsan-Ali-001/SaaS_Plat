import { createContext, type ReactNode, useState, type Dispatch, type SetStateAction } from "react";
import Trigger_Area from "../playground_content/trigger_area";

interface DesignContextType {
  stack: Array<string>;
  setStack: Dispatch<SetStateAction<Array<string>>>;
  normal_dict: NormalDict
  setNormal_dict: Dispatch<SetStateAction<NormalDict>>;
}

type NormalDict = {
  [key: string]: ReactNode| string;
};

const DesignContext = createContext<DesignContextType>({
  stack: [],
  setStack: () => {},
  normal_dict:{},
   setNormal_dict:() => {},
});

interface DesignStackProps {
  children: ReactNode;
}

const DesignStack = ({ children }: DesignStackProps) => {
  const [stack, setStack] = useState<Array<string>>([
    '101'
  ]); // default element
  const [normal_dict, setNormal_dict] = useState<NormalDict>(
    {'101':(<Trigger_Area/>)}
  ); // default element
  return (
    <DesignContext.Provider value={{ stack, setStack,normal_dict,setNormal_dict }}>
      {children}
    </DesignContext.Provider>
  );
};

export { DesignContext, DesignStack };
