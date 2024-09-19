'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';
import { TrashIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { FaClone } from 'react-icons/fa6';

interface ImageUploadProps {
  disabled?: boolean;
  onChage: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChage,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChage(result.info.secure_url);
  };

  return (
    <div>
      <div>
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <Image src={url} alt="image" className="object-cover" fill />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="sfu9he55">
        {({ open }) => {
          const handleOpenClick = () => {
            if (open && typeof open === 'function') {
              open();
            } else {
              console.error("CldUploadWidget's open function is unavailable");
            }
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={handleOpenClick}>
              <FaClone className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
