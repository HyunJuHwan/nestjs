import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsRepository extends Repository<Board> {
    constructor(private readonly dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        });

        await this.save(board);
        return board;
    }
}
