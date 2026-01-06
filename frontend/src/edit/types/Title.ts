export interface TitleEditorProps {
  title: string;
  ref: React.RefObject<HTMLTextAreaElement | null>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  currentLength: number;
    
  // 설정용 props
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
}