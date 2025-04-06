/**
 * OoJoo.js
 * A lightweight and customizable starry sky animation library
 * 
 * Copyright (c) 2025 Jay Choi.<jay@liveware.kr>
 * All rights reserved.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * OoJoo class creates a beautiful animated starry sky effect
 * with customizable options for stars count, size, rotation speed,
 * and twinkle animation.
 */
class OoJoo {
  /**
   * Creates a new OoJoo instance
   * @param {Object} options - Configuration options
   * @param {string} [options.containerId='star-container'] - ID of the container element
   * @param {number} [options.numberOfStars=220] - Number of stars to create
   * @param {number} [options.minStarSize=0.6] - Minimum star size in pixels
   * @param {number} [options.maxStarSize=2.4] - Maximum star size in pixels
   * @param {number} [options.twinkleDuration=5] - Duration of twinkle animation in seconds
   * @param {number} [options.rotationDuration=240] - Duration of sky rotation in seconds
   */
  constructor(options = {}) {
    this.options = {
      containerId: 'star-container',
      numberOfStars: 220,
      minStarSize: 0.6,
      maxStarSize: 2.4,
      twinkleDuration: 5,
      rotationDuration: 240,
      ...options
    };
    
    // Round star sizes to 2 decimal places for consistency
    this.options.minStarSize = this.roundToTwoDecimals(this.options.minStarSize);
    this.options.maxStarSize = this.roundToTwoDecimals(this.options.maxStarSize);
    
    this.container = null;
    this.init();
  }

  /**
   * Rounds a number to 2 decimal places
   * @param {number} num - Number to round
   * @returns {number} Rounded number
   */
  roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
  }

  /**
   * Initializes the starry sky effect
   * Creates container and applies initial styles
   */
  init() {
    // Create container if it doesn't exist
    this.container = document.getElementById(this.options.containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = this.options.containerId;
      document.body.appendChild(this.container);
    }
    
    this.createStars();
    this.applyStyles();
  }

  /**
   * Creates star elements with random positions and sizes
   */
  createStars() {
    // Clear existing stars
    this.container.innerHTML = '';
    
    for (let i = 0; i < this.options.numberOfStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      // Set random position
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      star.style.left = `${xPos}%`;
      star.style.top = `${yPos}%`;

      // Set random size within bounds
      const size = Math.random() * (this.options.maxStarSize - this.options.minStarSize) + this.options.minStarSize;
      star.style.width = `${this.roundToTwoDecimals(size)}px`;
      star.style.height = `${this.roundToTwoDecimals(size)}px`;

      // Set random twinkle animation delay
      const twinkleDelay = Math.random() * this.options.twinkleDuration;
      star.style.animationDelay = `-${twinkleDelay}s`;

      this.container.appendChild(star);
    }
  }

  /**
   * Applies necessary styles for container and stars
   */
  applyStyles() {
    // Container styles
    this.container.style.position = 'fixed';
    this.container.style.top = '50%';
    this.container.style.left = '50%';
    this.container.style.width = '200vw';
    this.container.style.height = '200vh';
    this.container.style.willChange = 'transform';
    this.container.style.animation = `rotate-sky ${this.options.rotationDuration}s linear infinite`;
    this.container.style.zIndex = '0';
    this.container.style.pointerEvents = 'none';
    
    // Star and animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotate-sky {
        from {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
      
      .star {
        position: absolute;
        width: 1px;
        height: 1px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 4px white, 0 0 6px white;
        opacity: 0.8;
        animation: twinkle ${this.options.twinkleDuration}s infinite alternate ease-in-out;
        will-change: opacity, transform;
      }
      
      @keyframes twinkle {
        0% {
          transform: scale(1);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.3);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 0.5;
        }
      }
    `;
    
    // Remove existing style tag if present
    const existingStyle = document.getElementById('oojoo-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'oojoo-style';
    document.head.appendChild(style);
  }

  /**
   * Updates the number of stars
   * @param {number} count - New number of stars
   */
  setNumberOfStars(count) {
    this.options.numberOfStars = count;
    this.createStars();
  }

  /**
   * Updates the rotation speed of the sky
   * @param {number} seconds - New rotation duration in seconds
   */
  setRotationDuration(seconds) {
    this.options.rotationDuration = seconds;
    this.container.style.animation = `rotate-sky ${seconds}s linear infinite`;
  }
  
  /**
   * Updates the size range of stars
   * @param {number} minSize - New minimum star size
   * @param {number} maxSize - New maximum star size
   */
  setStarSize(minSize, maxSize) {
    this.options.minStarSize = this.roundToTwoDecimals(minSize);
    this.options.maxStarSize = this.roundToTwoDecimals(maxSize);
    this.createStars();
  }
  
  /**
   * Updates the twinkle animation duration
   * @param {number} seconds - New twinkle duration in seconds
   */
  setTwinkleDuration(seconds) {
    this.options.twinkleDuration = seconds;
    this.createStars();
    this.applyStyles();
  }

  /**
   * Pauses the sky rotation animation
   */
  pause() {
    this.container.style.animationPlayState = 'paused';
  }

  /**
   * Resumes the sky rotation animation
   */
  resume() {
    this.container.style.animationPlayState = 'running';
  }

  /**
   * Removes the starry sky effect and cleans up resources
   */
  destroy() {
    if (this.container) {
      this.container.remove();
    }
    
    const style = document.getElementById('oojoo-style');
    if (style) {
      style.remove();
    }
  }
}

// Expose OoJoo to global scope
window.OoJoo = OoJoo;