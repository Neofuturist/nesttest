import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { articles } from './articles';
import { Article } from './article.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/create')
  @Render('create-article')
  getForm(): void {
    return;
  }

  @Get('/:id')
  @Render('article')
  getById(@Param('id', ParseIntPipe) id: number) {
    return articles.find((article) => article.id === id);
  }

  @Post('articles')
  @Redirect('/', 301)
  create(@Body() body: any): void {
    const id = articles.length + 1;
    const article = new Article(body.title, body.content, id);
    articles.push(article);
  }

  @Get()
  @Render('index')
  index() {
    return { articles };
  }
}
