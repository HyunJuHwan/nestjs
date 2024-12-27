import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    UseGuards,
    Logger,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoradStatusValidationPipe } from './pipes/board-status-validation-pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController');

    constructor(private boardService: BoardsService) {}

    @Get()
    async getAllBoards(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get allBoards`);
        return await this.boardService.getAllBoards(user);
    }

    @Post()
    @UsePipes(ValidationPipe) // 핸들러 레벨의 파이프 적용
    async createBoards(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User
    ): Promise<Board> {
        this.logger.verbose(`User ${user.username} trying to create a new board. Payload: ${JSON.stringify(createBoardDto)}`);
        return await this.boardService.createBoard(createBoardDto, user);
    }

    @Get(':id')
    async getBoardById(
        @Param('id', ParseIntPipe) id: number, // ParseIntPipe로 숫자로 변환
    ): Promise<Board> {
        return await this.boardService.getBoardById(id);
    }

    @Delete(':id')
    async deleteBoard(
        @Param('id', ParseIntPipe) id: number, // ParseIntPipe로 숫자로 변환
        @GetUser() user: User
    ): Promise<void> {
        return await this.boardService.deleteBoard(id, user);
    }

    @Patch(':id')
    async updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoradStatusValidationPipe) status: BoardStatus, // Parameter 레벨의 파이프 적용
    ): Promise<Board> {
        return await this.boardService.updateBoardStatus(id, status);
    }
}
