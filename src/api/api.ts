import { Router } from 'express';
import userRouter from './user/user-routes';
import videoRouter from './video/video-routes';
import previewPostRouter from './preview-post/preview-post-routes';
import imgRouter from './img/img-routes';
import videoCarouselRouter from './video-carousel/router';
import postRouter from './post/post-routes';
import authorRouter from './author/author-router';
import contactRouter from './contact/contact-routes';

const apiRouter = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/video', videoRouter);
apiRouter.use('/preview-post', previewPostRouter);
apiRouter.use('/img', imgRouter);
apiRouter.use('/video-carousel', videoCarouselRouter);
apiRouter.use('/post', postRouter);
apiRouter.use('/author', authorRouter);
apiRouter.use('/contact', contactRouter);

export default apiRouter;
