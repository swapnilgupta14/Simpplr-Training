import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";
import "@testing-library/jest-dom/vitest";

describe('User List Comp', () => {
    it('Should never render user when the arr is empty', () => {
        render(<UserList users={[]} />);

        expect(screen.getByText(/no users/i)).toBeInTheDocument();

    })

    it('Should render list of users', () => {
        const users: User[] = [
            { id: 1, name: 'Swap' },
            { id: 2, name: 'Nil' },
        ]
        render(<UserList users={users} />);

        users.forEach(user => {
            const link = screen.getByRole('link', { name: user.name });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', `/users/${user.id}`);
        })
    })
})
