"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'

function ImageUploadComponent({uploadedImage}) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            uploadedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className='w-full max-w-sm'>
            <Input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="block w-[280px] text-sm text-gray-500 file:mr-4 file:p-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 mb-4 h-14"
            />
            {preview && (
                <div className="mb-4">
                    <img
                        src={preview}
                        alt="Selected Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                </div>
            )}
        </div>
    )
}

export default ImageUploadComponent
