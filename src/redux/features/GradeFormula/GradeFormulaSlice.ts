import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface Tag {
  id: number;
  title: string;
}

export type Operator = "+" | "-" | "*" | "/";

export type Bracket = "(" | ")";

export type Operand = Tag | number;

export type ElementFormula =
  | {
      type: "Operator";
      value: Operator;
    }
  | {
      type: "Tag";
      value: Tag;
    }
  | {
      type: "Bracket";
      value: Bracket;
    }
  | {
      type: "Number";
      value: number;
    };

const tags: Tag[] = [
  {
    id: 1,
    title: "quiz1",
  },
  {
    id: 2,
    title: "quiz2",
  },
  {
    id: 3,
    title: "quiz3",
  },
  {
    id: 4,
    title: "quiz4",
  },
  {
    id: 5,
    title: "quiz5",
  },
];

const initialState: {
  tags: Tag[];
  formula: ElementFormula[];
  isDragging: boolean;
} = {
  tags: tags,
  formula: [],
  isDragging: false,
};

export const gradeFormulaSlice = createSlice({
  name: "GRADE_FORMULA",
  initialState,
  reducers: {
    updateTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
      state.formula = state.formula.filter(
        (ele) =>
          ele.type !== "Tag" ||
          action.payload.map((t) => t.id).includes(ele.value.id)
      );
    },
    appendFormula: (state, action: PayloadAction<ElementFormula>) => {
      state.formula.push(action.payload);
    },
    updateFormula: (state, action: PayloadAction<ElementFormula[]>) => {
      state.formula = [
        ...action.payload.map((ele) =>
          ele.type === "Tag" ? { ...ele, value: { ...ele.value } } : { ...ele }
        ),
      ];
    },
    setDraggingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
  },
});

export const { appendFormula, updateTags, updateFormula, setDraggingStatus } =
  gradeFormulaSlice.actions;

export const gradeFormulaSeletor = {
  tagsSelector: (state: RootState) => state.gradeFormula.tags,
  formulaSelector: (state: RootState) => state.gradeFormula.formula,
  isDraggingSelector: (state: RootState) => state.gradeFormula.isDragging,
};
