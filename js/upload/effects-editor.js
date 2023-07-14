const EFFECTS = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
  default: {
    name: 'none',
    min: 1,
    max: 1,
    step: 1,
    unit: ''
  }
};

const imagePreview = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectSaturation = document.querySelector('.effect-level__value');

const setContainerState = (value) => {
  if (value === 'none') {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
    return;
  }
  sliderContainer.classList.remove('hidden');
};

//обновление данных поля фильтра при обновлении
const setFilterState = (currentName, saturation, currentUnit) => {
  imagePreview.style.filter = `${currentName}(${saturation}${currentUnit})`;
  // console.log(saturation,currentName,currentUnit);
  effectSaturation.value = saturation;
};

//инициализация слайдера
const initEffects = (value) => {
  const { min, max, step, name, unit } = EFFECTS[value] || EFFECTS.default;

  setContainerState(value);

  noUiSlider.create(slider, {
    range: {
      min,
      max
    },
    step,
    start: max,
    connect: 'lower'
  });

  slider.noUiSlider.on('update', () => {
    const saturation = slider.noUiSlider.get();
    setFilterState(name, saturation, unit);
  });
};

//обновление эффектов слайдера
const updateEffects = (value) => {
  setContainerState(value);
  if (value === 'none') {
    return;
  }

  const { min, max, step, name, unit } = EFFECTS[value] || EFFECTS.default;

  slider.noUiSlider.updateOptions({
    range: {
      min,
      max
    },
    step,
    start: max,
  });

  setFilterState(name, max, unit);
};

export { initEffects, updateEffects };
