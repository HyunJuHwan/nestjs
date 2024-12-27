import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardsRepository } from './board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(private boardsRepository: BoardsRepository) {}

    async getAllBoards(user: User): Promise<Board[]> {
        // return await this.boardsRepository.find({ where: { user } });
        const boards = this.boardsRepository
            .createQueryBuilder('board')
            .where( 'board.userId = :userId', { userId: user.id })
            .getMany()
        
        return boards;
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardsRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const board = await this.boardsRepository.findOneBy({ id });

        if (!board) {
            throw new NotFoundException(`Board with ID "${id}" not found`);
        }

        return board;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        /**
            remove: 무조건 존재하는 값 삭제 시 (없으면 404)
            delete: 있으면 지우고 없으면 아무 영향 x, 
            - remove 사용 시 조회 후 삭제 해야해서 DB 접근이 두번 필요. 따라서, delete 사용 추천
        */
        const result = await this.boardsRepository.delete({id, user});
        
        if (result.affected === 0) {
            throw new NotFoundException(`Board with ID "${id}" not found`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;

        await this.boardsRepository.save(board);
        return board;
    }
}
