import { createContext, type ReactNode, useState, type Dispatch, type SetStateAction } from "react";
import Trigger_Area from "../playground_content/trigger_area";

interface DesignContextType {
  stack: Array<string>;
  setStack: Dispatch<SetStateAction<Array<string>>>;
  normal_dict: NormalDict
  setNormal_dict: Dispatch<SetStateAction<NormalDict>>;
  unqiue_key: unique_to_Dragable;
  setUnqiueKey: Dispatch<SetStateAction<unique_to_Dragable >>;
}

type NormalDict = {
  [key: string]: ReactNode| string;
};
type unique_to_Dragable = {
  [key: string]:  string;
};
const DesignContext = createContext<DesignContextType>({
  stack: [],
  setStack: () => {},
  normal_dict:{},
   setNormal_dict:() => {},
   unqiue_key:{},
   setUnqiueKey:() => {},
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

    const [unqiue_key, setUnqiueKey] = useState<unique_to_Dragable >(
    {'101':'101'}
  );
  return (
    <DesignContext.Provider value={{ stack, setStack,normal_dict,setNormal_dict,unqiue_key, setUnqiueKey }}>
      {children}
    </DesignContext.Provider>
  );
};

export { DesignContext, DesignStack };
