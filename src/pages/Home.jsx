/* Home.jsx */
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { slideAnimation } from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: 'athletic',
      tshirtText: '',
    },
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const preview = URL.createObjectURL(file);
      setUploadedImage(preview);
    },
  });

  const onSubmit = (data) => {
    state.formData = data;
    state.image = uploadedImage;
    state.shirtText = data.tshirtText;
    state.intro = false;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'q') {
        handleSubmit(onSubmit)();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit, uploadedImage]);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home p-6 text-white" {...slideAnimation('left')}>
          <div className="mb-6 text-center">
  <h2 className="text-2xl font-bold">Customize Your Fit</h2>
  <p className="text-sm text-gray-300 mt-1">Press <kbd className="px-1 py-0.5 bg-gray-600 rounded">Alt + Q</kbd> to continue</p>
</div>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
            {/* Height */}
            <label className="block">
              Height (cm):
              <input
                type="number"
                step="1"
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white"
                {...register('height')}
              />
            </label>

            {/* Weight */}
            <label className="block">
              Weight (kg):
              <input
                type="number"
                step="1"
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white"
                {...register('weight')}
              />
            </label>

            {/* Build */}
            <label className="block">
              Build:
              <select
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white"
                {...register('build')}
              >
                <option value="lean">Lean</option>
                <option value="regular">Regular</option>
                <option value="athletic">Athletic</option>
                <option value="big">Big</option>
              </select>
            </label>

            {/* T-Shirt Print Text */}
            <label className="block">
              T-Shirt Print Text (Max 3 lines):
              <textarea
                className="w-full mt-1 p-2 rounded bg-gray-800 text-white"
                rows={3}
                maxLength={300}
                placeholder="Enter up to 3 lines"
                {...register('tshirtText')}
              />
            </label>

            {/* Image Upload */}
            <div
              {...getRootProps()}
              className="p-4 border border-dashed border-gray-400 rounded text-center bg-gray-700 hover:bg-gray-600 cursor-pointer"
            >
              <input {...getInputProps()} />
              <p className="text-sm text-gray-200">
                {uploadedImage ? 'Click to change image' : 'Drop an image here, or click to select one'}
              </p>
              {uploadedImage && <img src={uploadedImage} alt="Preview" className="mt-2 h-32 object-contain mx-auto" />}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Continue
            </button>
          </form>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
