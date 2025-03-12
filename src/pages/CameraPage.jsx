import React, { useState, useRef, useEffect } from 'react';
import { Camera, Download, Image, RefreshCw, Square, Trash, Palette, Sliders, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { motion } from "framer-motion";

function CameraPage() {
  // Existing state variables
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [cameraStream, setCameraStream] = useState(null);
  const [aspectRatio, setAspectRatio] = useState({ width: 4, height: 3 });
  const [colorFilter, setColorFilter] = useState('none');
  const [customFrameColor, setCustomFrameColor] = useState('#FF9500');
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // New state variables
  const [customFilterColor, setCustomFilterColor] = useState('#3498db');
  const [customFilterOpacity, setCustomFilterOpacity] = useState(0.3);
  const [showFilterColorPicker, setShowFilterColorPicker] = useState(false);
  const [filterIntensity, setFilterIntensity] = useState(0.5);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  // Added a new canvas ref for the framed photo
  const framedCanvasRef = useRef(null);
  
  // Enhanced frames array with more options
  const frames = [
    { name: 'Klasik', border: 'border-8 border-amber-500' },
    { name: 'Modern', border: 'border-8 border-blue-500' },
    { name: 'Bunga', border: 'border-8 border-pink-500 rounded-xl' },
    { name: 'Gelombang', border: 'border-8 border-purple-500 rounded-full' },
    { name: 'Kustom', border: 'border-8 rounded-lg', custom: true },
    { name: 'Vintage', border: 'border-8 border-amber-700 rounded-sm border-opacity-80' },
    { name: 'Polaroid', border: 'border-12 border-b-24 border-white' },
    { name: 'Retro', border: 'border-4 border-yellow-400 border-dashed' },
    { name: 'Minimalis', border: 'border-2 border-white' },
    { name: 'Zigzag', border: 'border-8 border-indigo-500 rounded-tr-2xl rounded-bl-2xl' },
  ];

  // Enhanced color filters array with more options
  const colorFilters = [
    { name: 'Normal', value: 'none', class: '' },
    { name: 'Sepia', value: 'sepia', class: 'sepia' },
    { name: 'Grayscale', value: 'grayscale', class: 'grayscale' },
    { name: 'Vintage', value: 'vintage', class: 'brightness-90 contrast-110 sepia-[.25]' },
    { name: 'Cool', value: 'cool', class: 'brightness-110 hue-rotate-15' },
    { name: 'Warm', value: 'warm', class: 'brightness-105 saturate-150 hue-rotate-[-10deg]' },
    { name: 'Dramatic', value: 'dramatic', class: 'contrast-125 brightness-75 saturate-150' },
    { name: 'Noir', value: 'noir', class: 'grayscale contrast-150 brightness-90' },
    { name: 'Pastel', value: 'pastel', class: 'saturate-50 brightness-110 contrast-90' },
    { name: 'Polaroid', value: 'polaroid', class: 'brightness-105 contrast-105 saturate-85 sepia-[.15]' },
    { name: 'Kustom', value: 'custom', class: '' },
  ];
  
  // Existing useEffect hooks and functions
  useEffect(() => {
    getVideo();
    
    return () => {
      // Clean up video stream when component unmounts
      stopCameraStream();
    };
  }, []);
  
  useEffect(() => {
    let timer;
    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isCountingDown && countdown === 0) {
      capturePhoto();
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isCountingDown, countdown]);

  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };
  
  const getVideo = () => {
    setCameraReady(false);
    // Stop any existing stream first
    stopCameraStream();
    
    navigator.mediaDevices
      .getUserMedia({ 
        video: { width: 1280, height: 720 },
        audio: false 
      })
      .then(stream => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          setCameraStream(stream);
          
          // Wait for video metadata to be loaded to get actual dimensions
          video.onloadedmetadata = () => {
            // Set aspect ratio based on actual video dimensions
            setAspectRatio({
              width: video.videoWidth,
              height: video.videoHeight
            });
            video.play();
            setCameraReady(true);
          };
        }
      })
      .catch(err => {
        console.error("Error accessing camera:", err);
      });
  };
  
  const startCountdown = () => {
    setIsCountingDown(true);
    setCountdown(3);
  };
  
  // Modified to handle custom filter
  const capturePhoto = () => {
    setIsCountingDown(false);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;
    
    // Use the actual video dimensions to maintain aspect ratio
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    
    // Set canvas to match video dimensions exactly
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Draw the video frame to the canvas, maintaining aspect ratio
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    
    // Apply filter effects directly to canvas if selected
    if (colorFilter !== 'none') {
      // Create temporary canvas for filter effects
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = videoWidth;
      tempCanvas.height = videoHeight;
      const tempCtx = tempCanvas.getContext('2d');
      
      // Draw image to temp canvas
      tempCtx.drawImage(canvas, 0, 0);
      
      // Get image data
      const imageData = tempCtx.getImageData(0, 0, videoWidth, videoHeight);
      const data = imageData.data;
      
      // Apply filter effects
      switch(colorFilter) {
        case 'sepia':
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
          }
          break;
        case 'grayscale':
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
          }
          break;
        case 'vintage':
          for (let i = 0; i < data.length; i += 4) {
            // Slight sepia + contrast
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            
            // Sepia effect (25%)
            r = r * 0.9 + (r * 0.393 + g * 0.769 + b * 0.189) * 0.1;
            g = g * 0.9 + (r * 0.349 + g * 0.686 + b * 0.168) * 0.1;
            b = b * 0.9 + (r * 0.272 + g * 0.534 + b * 0.131) * 0.1;
            
            // Contrast
            r = ((r / 255 - 0.5) * 1.1 + 0.5) * 255;
            g = ((g / 255 - 0.5) * 1.1 + 0.5) * 255;
            b = ((b / 255 - 0.5) * 1.1 + 0.5) * 255;
            
            data[i] = Math.max(0, Math.min(255, r));
            data[i + 1] = Math.max(0, Math.min(255, g));
            data[i + 2] = Math.max(0, Math.min(255, b));
          }
          break;
        case 'cool':
          for (let i = 0; i < data.length; i += 4) {
            // Increase brightness, slight blue tint
            data[i] = Math.min(255, data[i] * 1.05);
            data[i + 1] = Math.min(255, data[i + 1] * 1.05);
            data[i + 2] = Math.min(255, data[i + 2] * 1.15);
          }
          break;
        case 'warm':
          for (let i = 0; i < data.length; i += 4) {
            // Warmer colors (more red/yellow)
            data[i] = Math.min(255, data[i] * 1.15); // Red
            data[i + 1] = Math.min(255, data[i + 1] * 1.1); // Green
            data[i + 2] = Math.min(255, data[i + 2] * 0.9); // Blue
          }
          break;
        case 'dramatic':
          for (let i = 0; i < data.length; i += 4) {
            // High contrast, dark shadows
            data[i] = Math.min(255, data[i] * 1.25 - 20);
            data[i + 1] = Math.min(255, data[i + 1] * 1.25 - 20);
            data[i + 2] = Math.min(255, data[i + 2] * 1.25 - 20);
          }
          break;
        case 'noir':
          for (let i = 0; i < data.length; i += 4) {
            // High contrast black and white
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const newVal = ((avg / 255 - 0.5) * 1.5 + 0.5) * 255;
            data[i] = data[i + 1] = data[i + 2] = Math.max(0, Math.min(255, newVal));
          }
          break;
        case 'pastel':
          for (let i = 0; i < data.length; i += 4) {
            // Lightened, less saturated
            data[i] = Math.min(255, data[i] * 0.8 + 50);
            data[i + 1] = Math.min(255, data[i + 1] * 0.8 + 50);
            data[i + 2] = Math.min(255, data[i + 2] * 0.8 + 50);
          }
          break;
        case 'polaroid':
          for (let i = 0; i < data.length; i += 4) {
            // Slight brightness, contrast, and sepia
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            
            r = Math.min(255, r * 1.05);
            g = Math.min(255, g * 1.05);
            b = Math.min(255, b * 0.95);
            
            data[i] = r * 0.9 + (r * 0.393 + g * 0.769 + b * 0.189) * 0.1;
            data[i + 1] = g * 0.9 + (r * 0.349 + g * 0.686 + b * 0.168) * 0.1;
            data[i + 2] = b * 0.9 + (r * 0.272 + g * 0.534 + b * 0.131) * 0.1;
          }
          break;
        case 'custom':
          // Fix for the custom filter - adjusted to use proper blend mode and more transparency
          // Parse the custom filter color and apply with user-defined opacity
          const r = parseInt(customFilterColor.slice(1, 3), 16);
          const g = parseInt(customFilterColor.slice(3, 5), 16);
          const b = parseInt(customFilterColor.slice(5, 7), 16);
          
          for (let i = 0; i < data.length; i += 4) {
            // Apply color overlay with blend mode (multiply-like effect)
            // This creates a more subtle tint similar to other filters
            const originalR = data[i];
            const originalG = data[i + 1];
            const originalB = data[i + 2];
            
            // Blend the original pixel with the filter color using the intensity slider
            data[i] = originalR * (1 - filterIntensity) + (originalR * r / 255) * filterIntensity;
            data[i + 1] = originalG * (1 - filterIntensity) + (originalG * g / 255) * filterIntensity;
            data[i + 2] = originalB * (1 - filterIntensity) + (originalB * b / 255) * filterIntensity;
          }
          break;
      }
      
      // Put modified image data back to temp canvas
      tempCtx.putImageData(imageData, 0, 0);
      
      // Draw from temp canvas back to main canvas
      ctx.drawImage(tempCanvas, 0, 0);
    }
    
    const newPhotoSrc = canvas.toDataURL('image/jpeg', 0.9);
    setPhotoSrc(newPhotoSrc);
    setHasPhoto(true);
    
    // Important - after taking a photo we should pause the video stream
    // but NOT stop it completely, so it will be ready for the next photo
    if (video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach(track => track.enabled = false);
    }
  };
  
  // Modified to save custom filter settings
  const saveToGallery = () => {
    if (photoSrc) {
      setCapturedPhotos([...capturedPhotos, {
        id: Date.now(),
        src: photoSrc,
        frame: selectedFrame,
        filter: colorFilter,
        customColor: frames[selectedFrame].custom ? customFrameColor : null,
        customFilterColor: colorFilter === 'custom' ? customFilterColor : null,
        filterIntensity: colorFilter === 'custom' ? filterIntensity : null
      }]);
      closePhoto();
    }
  };
  
  const closePhoto = () => {
    let canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    setHasPhoto(false);
    setPhotoSrc(null);
    
    // Re-enable the existing tracks instead of getting a new stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      if (tracks.length > 0) {
        tracks.forEach(track => track.enabled = true);
        setCameraReady(true);
      } else {
        // Only get a new video stream if tracks are not available
        getVideo();
      }
    } else {
      // If no stream exists at all, get a new one
      getVideo();
    }
  };
  
  // Modified download function to include the frame
  const downloadPhoto = (src = photoSrc, photoFrameIndex = selectedFrame, customColor = customFrameColor) => {
    if (!src) return;
    
    // Check if we're running in a browser environment
    if (typeof window === 'undefined') return;
    
    // Create a new canvas for the framed photo
    const framedCanvas = document.createElement('canvas');
    
    // Use window.Image() to ensure we're using the browser's Image constructor
    const img = new window.Image();
    
    img.onload = () => {
      // Get the frame properties
      const frame = frames[photoFrameIndex];
      const borderWidth = frame.border.includes('border-12') ? 12 : 
                         frame.border.includes('border-8') ? 8 : 
                         frame.border.includes('border-4') ? 4 : 2;
      
      // For Polaroid style, we need extra bottom padding
      const extraBottom = frame.border.includes('border-b-24') ? 16 : 0;
      
      // Set canvas size to include the border
      framedCanvas.width = img.width + borderWidth * 2;
      framedCanvas.height = img.height + borderWidth * 2 + extraBottom;
      
      const ctx = framedCanvas.getContext('2d');
      
      // Apply background color to the entire canvas
      ctx.fillStyle = frame.custom ? customColor : getBorderColor(frame.border);
      ctx.fillRect(0, 0, framedCanvas.width, framedCanvas.height);
      
      // Create a path for the inner cutout based on frame style
      ctx.beginPath();
      
      if (frame.border.includes('rounded-full')) {
        // For circular frame
        const centerX = framedCanvas.width / 2;
        const centerY = framedCanvas.height / 2;
        const radius = Math.min(img.width, img.height) / 2;
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.closePath();
        
        // Create clipping region
        ctx.save();
        ctx.clip();
        
        // Draw the image in the center of the circular clipping region
        ctx.drawImage(
          img, 
          centerX - radius, 
          centerY - radius, 
          radius * 2, 
          radius * 2
        );
        
        ctx.restore();
      } else if (frame.border.includes('rounded-xl')) {
        // For rounded corners
        const radius = 15;
        roundRect(ctx, borderWidth, borderWidth, img.width, img.height, radius);
        
        // Create clipping region
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, borderWidth, borderWidth, img.width, img.height);
        ctx.restore();
      } else if (frame.border.includes('rounded-tr-2xl') || frame.border.includes('rounded-bl-2xl')) {
        // Zigzag pattern with diagonal corners
        ctx.save();
        ctx.moveTo(borderWidth, borderWidth);
        ctx.lineTo(framedCanvas.width - borderWidth, borderWidth);
        ctx.quadraticCurveTo(
          framedCanvas.width - borderWidth / 2, 
          borderWidth / 2, 
          framedCanvas.width - borderWidth / 2, 
          borderWidth * 2
        );
        ctx.lineTo(framedCanvas.width - borderWidth / 2, framedCanvas.height - borderWidth * 2);
        ctx.quadraticCurveTo(
          framedCanvas.width - borderWidth / 2, 
          framedCanvas.height - borderWidth / 2,
          framedCanvas.width - borderWidth, 
          framedCanvas.height - borderWidth
        );
        ctx.lineTo(borderWidth, framedCanvas.height - borderWidth);
        ctx.quadraticCurveTo(
          borderWidth / 2, 
          framedCanvas.height - borderWidth / 2, 
          borderWidth / 2, 
          framedCanvas.height - borderWidth * 2
        );
        ctx.lineTo(borderWidth / 2, borderWidth * 2);
        ctx.quadraticCurveTo(
          borderWidth / 2, 
          borderWidth / 2, 
          borderWidth, 
          borderWidth
        );
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, borderWidth, borderWidth, img.width, img.height);
        ctx.restore();
      } else if (frame.border.includes('rounded-lg') || frame.border.includes('rounded-sm')) {
        // For slightly rounded corners
        const radius = frame.border.includes('rounded-lg') ? 8 : 4;
        roundRect(ctx, borderWidth, borderWidth, img.width, img.height, radius);
        
        // Create clipping region
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, borderWidth, borderWidth, img.width, img.height);
        ctx.restore();
      } else if (frame.border.includes('border-dashed')) {
        // Draw the regular image for dashed border
        ctx.drawImage(img, borderWidth, borderWidth, img.width, img.height);
        
        // Draw dashed border on top
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = getBorderColor(frame.border);
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(borderWidth/2, borderWidth/2, framedCanvas.width - borderWidth, framedCanvas.height - borderWidth);
      } else {
        // Regular frame
        ctx.drawImage(img, borderWidth, borderWidth, img.width, img.height);
      }
      
      // Create a download link with the framed image
      const framedImage = framedCanvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = `photobooth-${Date.now()}.jpg`;
      link.href = framedImage;
      link.click();
    };
    
    img.src = src;
  };
  
  // Helper function to get border color from class name
  const getBorderColor = (borderClass) => {
    if (borderClass.includes('border-amber-500')) return '#f59e0b';
    if (borderClass.includes('border-amber-700')) return '#b45309';
    if (borderClass.includes('border-blue-500')) return '#3b82f6';
    if (borderClass.includes('border-pink-500')) return '#ec4899';
    if (borderClass.includes('border-purple-500')) return '#a855f7';
    if (borderClass.includes('border-yellow-400')) return '#facc15';
    if (borderClass.includes('border-indigo-500')) return '#6366f1';
    if (borderClass.includes('border-white')) return '#ffffff';
    return '#000000';
  };
  
  // Helper function to draw rounded rectangles
  const roundRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };
  
  const deleteFromGallery = (id) => {
    setCapturedPhotos(capturedPhotos.filter(photo => photo.id !== id));
  };
  
  // Calculate aspect ratio style to maintain consistent dimensions
  const getAspectRatioStyle = () => {
    // Use a standard container width
    const containerWidth = 100; // percentage
    const containerHeight = (aspectRatio.height / aspectRatio.width) * containerWidth;
    
    return {
      paddingBottom: `${containerHeight}%`,
      width: `${containerWidth}%`
    };
  };

  // Get CSS class for the selected filter
  const getFilterClass = (filterName) => {
    if (filterName === 'custom') {
      return '';  // Custom filter is applied via canvas processing, not CSS
    }
    const filter = colorFilters.find(f => f.value === filterName);
    return filter ? filter.class : '';
  };
  
  // Get border style with custom color if selected
  const getFrameStyle = (frameIndex) => {
    const frame = frames[frameIndex];
    if (frame.custom) {
      return {
        borderColor: customFrameColor
      };
    }
    return {};
  };
  
  // Get custom filter style for preview
  const getCustomFilterStyle = () => {
    if (colorFilter !== 'custom') return {};
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: customFilterColor,
      opacity: filterIntensity,
      mixBlendMode: 'soft-light',
      pointerEvents: 'none'
    };
  };
  
  return (
    <div className="min-h-screen py-20 px-6 text-white flex flex-col items-center">
      <motion.h1
        className="text-4xl font-bold mb-8 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Photobooth Online
      </motion.h1>
      
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6 relative z-10">
        {/* Gallery sidebar */}
        <motion.div 
          className="w-full md:w-64 flex-shrink-0 space-y-4 mb-6 md:mb-0 order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold">Foto Anda</h2>
          
          <div className="h-96 overflow-y-auto pr-2 space-y-4">
            {capturedPhotos.length === 0 ? (
              <div className="flex items-center justify-center h-32 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-gray-400">
                <p>Belum ada foto</p>
              </div>
            ) : (
              capturedPhotos.map((photo) => {
                const frameBorderClass = frames[photo.frame].custom 
                  ? 'border-8 rounded-lg' 
                  : frames[photo.frame].border;
                
                const frameStyle = frames[photo.frame].custom 
                  ? { borderColor: photo.customColor } 
                  : {};
                
                return (
                  <motion.div 
                    key={photo.id}
                    className={`relative group ${frameBorderClass} overflow-hidden bg-black`}
                    style={frameStyle}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={photo.src} 
                      alt="Captured" 
                      className={`w-full h-auto object-contain ${getFilterClass(photo.filter)}`}
                    />
                    
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-200">
                      <button 
                        className="btn btn-circle btn-sm"
                        onClick={() => downloadPhoto(photo.src)}
                      >
                        <Download size={16} />
                      </button>
                      <button 
                        className="btn btn-circle btn-sm btn-error"
                        onClick={() => deleteFromGallery(photo.id)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
        
        {/* Main camera area */}
        <motion.div 
          className="flex-1 flex flex-col items-center order-1 md:order-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6 w-full max-w-2xl mx-auto">
            <div 
              className={`relative border-8 bg-black overflow-hidden transition-all duration-300 ${frames[selectedFrame].custom ? 'rounded-lg' : frames[selectedFrame].border.replace('border-8 ', '')}`}
              style={{ 
                width: '100%',
                position: 'relative',
                ...(frames[selectedFrame].custom 
                  ? { borderColor: customFrameColor } 
                  : {})
              }}
            >
              <div style={getAspectRatioStyle()} /> {/* Aspect ratio spacer */}
              
              {!hasPhoto ? (
                <>
                  <video 
                    ref={videoRef} 
                    className={`absolute top-0 left-0 w-full h-full object-cover ${getFilterClass(colorFilter)}`}
                  />
                  {colorFilter === 'custom' && (
                    <div style={getCustomFilterStyle()} />
                  )}
                </>
              ) : (
                <>
                  <img 
                    ref={photoRef} 
                    src={photoSrc} 
                    alt="Captured photo" 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </>
              )}
              
              {/* Countdown overlay */}
              {isCountingDown && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-black/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span 
                    className="text-8xl font-bold"
                    key={countdown}
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {countdown}
                  </motion.span>
                </motion.div>
              )}
              
              {/* Camera loading state */}
              {!cameraReady && !hasPhoto && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="animate-spin">
                    <RefreshCw size={48} />
                  </div>
                  <p className="text-xl ml-4">Menyiapkan kamera...</p>
                </div>
              )}
            </div>
            
            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          {/* Frame and filter controls */}
          <div className="w-full max-w-2xl mb-6">
            {/* Frame selection */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Pilih Bingkai:</h3>
              <div className="flex flex-wrap gap-3 max-h-24 overflow-y-auto pb-2">
                {frames.map((frame, index) => (
                  <motion.button
                    key={`frame-${index}`}
                    className={`btn ${selectedFrame === index ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setSelectedFrame(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Square className="mr-2" size={16} />
                    {frame.name}
                  </motion.button>
                ))}
              </div>
              
              {/* Custom color picker for custom frame */}
              {frames[selectedFrame].custom && (
                <div className="mt-3 p-3 bg-black/30 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-3">
                    <label htmlFor="colorPicker" className="font-medium">Warna Bingkai:</label>
                    <div className="relative">
                      <div 
                        className="w-8 h-8 rounded border cursor-pointer" 
                        style={{ backgroundColor: customFrameColor }}
                        onClick={() => setShowColorPicker(!showColorPicker)}
                      />
                      {showColorPicker && (
                        <div className="relative z-20 mt-2 p-2 bg-black/90 border border-white/20 rounded-lg">
                          <div className="mt-2 flex items-center">
                            <input 
                              type="text" 
                              value={customFrameColor}
                              onChange={(e) => setCustomFrameColor(e.target.value)}
                              className="w-full bg-black text-white border border-white/30 rounded px-2 py-1 text-sm"
                              placeholder="#RRGGBB"
                            />
                          </div>
                          <div className="mt-2">
                            <input
                              type="color"
                              value={customFrameColor}
                              onChange={(e) => setCustomFrameColor(e.target.value)}
                              className="w-full h-8 rounded cursor-pointer"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Filter selection */}
            <div>
              <h3 className="text-lg font-medium mb-2">Filter Warna:</h3>
              <div className="flex flex-wrap gap-3 max-h-24 overflow-y-auto pb-2">
                {colorFilters.map((filter) => (
                  <motion.button
                    key={`filter-${filter.value}`}
                    className={`btn ${colorFilter === filter.value ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setColorFilter(filter.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <Palette className="mr-2" size={16} />
                    {filter.name}
                  </motion.button>
                ))}
              </div>
              
              {/* Custom filter controls */}
              {colorFilter === 'custom' && (
                <div className="mt-3 p-3 bg-black/30 backdrop-blur-sm rounded-lg">
                  <div className="mb-3">
                    <label className="font-medium mb-2 block">Warna Filter:</label>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded border cursor-pointer" 
                        style={{ backgroundColor: customFilterColor }}
                        onClick={() => setShowFilterColorPicker(!showFilterColorPicker)}
                      />
                      <input 
                        type="text" 
                        value={customFilterColor}
                        onChange={(e) => setCustomFilterColor(e.target.value)}
                        className="w-full bg-black text-white border border-white/30 rounded px-2 py-1 text-sm"
                        placeholder="#RRGGBB"
                      />
                      <input
                        type="color"
                        value={customFilterColor}
                        onChange={(e) => setCustomFilterColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                       </div>
                  </div>
                  <div className="mt-2">
                    <label className="font-medium mb-2 block">Intensitas Filter:</label>
                    <div className="flex items-center gap-3">
                      <Sliders size={16} />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={filterIntensity}
                        onChange={(e) => setFilterIntensity(parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <span className="w-12 text-right">{Math.round(filterIntensity * 100)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Camera controls */}
          <div className="w-full max-w-2xl">
            <div className="flex justify-center gap-3">
              {!hasPhoto ? (
                <>
                  <motion.button 
                    className="btn btn-primary btn-lg"
                    onClick={startCountdown}
                    disabled={!cameraReady || isCountingDown}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="mr-2" size={20} />
                    Ambil Foto
                  </motion.button>
                  <motion.button 
                    className="btn btn-outline btn-lg"
                    onClick={getVideo}
                    disabled={!cameraReady || isCountingDown}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="mr-2" size={20} />
                    Reset Kamera
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button 
                    className="btn btn-success btn-lg"
                    onClick={saveToGallery}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image className="mr-2" size={20} />
                    Simpan
                  </motion.button>
                  <motion.button 
                    className="btn btn-outline btn-lg"
                    onClick={closePhoto}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="mr-2" size={20} />
                    Ambil Ulang
                  </motion.button>
                  <motion.button 
                    className="btn btn-info btn-lg"
                    onClick={() => downloadPhoto()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="mr-2" size={20} />
                    Unduh
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Tutorial section */}
      <motion.div 
        className="w-full max-w-6xl mt-12 p-6 bg-black/30 backdrop-blur-sm rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">Cara Menggunakan Photobooth Online</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">1</span>
              <h3 className="text-lg font-semibold">Pilih Bingkai & Filter</h3>
            </div>
            <p className="text-gray-300 pl-11">Pilih bingkai dan filter warna yang Anda inginkan. Untuk bingkai kustom, Anda dapat memilih warna sendiri.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">2</span>
              <h3 className="text-lg font-semibold">Ambil Foto</h3>
            </div>
            <p className="text-gray-300 pl-11">Klik 'Ambil Foto' dan bersiaplah! Ada hitungan mundur 3 detik sebelum foto diambil.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">3</span>
              <h3 className="text-lg font-semibold">Simpan atau Unduh</h3>
            </div>
            <p className="text-gray-300 pl-11">Simpan foto ke galeri atau unduh langsung ke perangkat Anda. Foto tersimpan di galeri selama sesi ini.</p>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile gallery sliding panel (visible only on small screens) */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md md:hidden z-20 rounded-t-2xl border-t border-white/10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Galeri Foto ({capturedPhotos.length})</h3>
            <button className="btn btn-circle btn-sm">
              <ChevronDown size={20} />
            </button>
          </div>
          
          {capturedPhotos.length === 0 ? (
            <div className="flex items-center justify-center h-24 bg-black/40 rounded-lg text-gray-400">
              <p>Belum ada foto</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {capturedPhotos.map((photo) => {
                const frameBorderClass = frames[photo.frame].custom 
                  ? 'border-4 rounded-lg' 
                  : frames[photo.frame].border.replace('border-8', 'border-4');
                
                const frameStyle = frames[photo.frame].custom 
                  ? { borderColor: photo.customColor } 
                  : {};
                
                return (
                  <div 
                    key={photo.id}
                    className={`relative group ${frameBorderClass} overflow-hidden bg-black flex-shrink-0 w-24 h-24`}
                    style={frameStyle}
                  >
                    <img 
                      src={photo.src} 
                      alt="Captured" 
                      className={`w-full h-full object-cover ${getFilterClass(photo.filter)}`}
                    />
                    
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-200">
                      <button 
                        className="btn btn-circle btn-xs"
                        onClick={() => downloadPhoto(photo.src)}
                      >
                        <Download size={12} />
                      </button>
                      <button 
                        className="btn btn-circle btn-xs btn-error"
                        onClick={() => deleteFromGallery(photo.id)}
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
      
   
    </div>
  );
}

export default CameraPage;