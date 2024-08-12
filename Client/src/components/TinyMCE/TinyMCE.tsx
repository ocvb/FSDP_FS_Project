import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEProps {
    value?: string;
    handler?: (content: string) => void;
}

export default function TinyMCE({ value, handler }: TinyMCEProps) {
    return (
        <Editor
            apiKey='k7cat5uwjifjmnoslv215mrueizj2n71k5kqs0v5k0aifrru'
            value={value}
            init={{
                height: 500,
                width: '100%',
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                placeholder: 'Write your response here...',
            }}
            onEditorChange={handler}
        />
    );
}
