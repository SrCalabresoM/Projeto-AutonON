import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import 'jodit/esm/langs/pt_br.js';
import 'jodit/es2021/jodit.min.css';

const Apresentação = ({ placeholder, content, setContent}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false, 
      language: 'pt_br',
      toolbarAdaptive: false,
      buttons: [
        'bold',
        'italic',
        'underline',
        '|',
        'paragraph',
        'align',
        '|',
        'ul',
        'ol',
        '|',
        'link',
        '|',
        'fullsize',
        '|',
        'undo',
        'redo'
        ],
    }),
    [placeholder]
  );

  return (
    <>
    <p className='font-bold size-2'>Descrição</p><br></br>
    <div className='prose'>
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={newContent => setContent(newContent)} 
      onChange={newContent => {}}
    />
    </div>
    </>
  );
};

export default Apresentação;