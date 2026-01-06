export interface HashTagChipProps {
  label: string;
  onRemove?: () => void;
}

export interface TagEditorProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}

export interface TagInputProps {
  onSubmit: (tags: string) => void;
  onBackspace?: () => void;
}