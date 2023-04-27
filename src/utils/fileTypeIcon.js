import { MdPictureAsPdf } from 'react-icons/md';
import { IoDocument } from 'react-icons/io5';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { AiFillFileMarkdown } from 'react-icons/ai';
import { PaperClipIcon } from '@heroicons/react/20/solid';

export const fileTypeIcon = (type) => {
  switch (type) {
    case 'xlsx':
      return <HiOutlineDocumentReport className="w-6 h-6 mr-4 text-primary" />;
    case 'doc':
      return <IoDocument className="w-6 h-6 mr-4 text-primary" />;
    case 'odt':
      return <IoDocument className="w-6 h-6 mr-4 text-primary" />;
    case 'docx':
      return <IoDocument className="w-6 h-6 mr-4 text-primary" />;
    case 'pdf':
      return <MdPictureAsPdf className="w-6 h-6 mr-4 text-primary" />;
    case 'md':
      return <AiFillFileMarkdown className="w-6 h-6 mr-4 text-primary" />;
    default:
      return <PaperClipIcon className="w-6 h-6 mr-4 text-primary" />;
  }
};

export default fileTypeIcon;
