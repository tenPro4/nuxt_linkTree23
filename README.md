## Setup
```
npm create vite@latest my-vue-app --template vue
```

## Features
- Camera capture with vue-advanced-cropper
- useDebounce with nuxt-lodash
- Mouse interactive by event

## Additional Notes
1. Get Camera Permission
let stream = await navigator.mediaDevices.getUserMedia({
	video: 
	{
		width: { max: 1024 },
		height: { max: 1024 },
		aspectRatio: { ideal: 1 }
	}
})
