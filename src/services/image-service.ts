import axios from 'axios';
    import { apiConfig } from '../lib/api-config';

    export interface GenerationRequest {
      prompt: string;
      steps?: number;
      cfg_scale?: number;
      enable_refiner?: boolean;
      height?: number;
      width?: number;
      backend?: string;
    }

    export class ImageService {
      static async generateImage(params: GenerationRequest) {
        try {
          const response = await axios.post(
            apiConfig.API_URL,
            {
              model_name: "FLUX.1-dev",
              prompt: params.prompt,
              steps: params.steps || 30,
              cfg_scale: params.cfg_scale || 5,
              enable_refiner: params.enable_refiner || false,
              height: params.height || 1024,
              width: params.width || 1024,
              backend: params.backend || "auto"
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiConfig.FLUX_API_KEY}`
              }
            }
          );

          return response.data;
        } catch (error) {
          console.error('Error generating image:', error);
          throw error;
        }
      }
    }
